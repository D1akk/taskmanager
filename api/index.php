<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();
$method = $_SERVER['REQUEST_METHOD'];

switch($method){
    case "GET":
      $sql = "SELECT * FROM tasks";
      $path = explode('/', $_SERVER['REQUEST_URI']);
      if(isset($path[4]) && is_numeric($path[4])) {
          $sql .= " WHERE id = :id";
          $stmt = $conn->prepare($sql);
          $stmt->bindParam(':id', $path[4]);
          $stmt->execute();
          $tasks = $stmt->fetch(PDO::FETCH_ASSOC);
      } else {
          $stmt = $conn->prepare($sql);
          $stmt->execute();
          $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
      }
      echo json_encode($tasks);
      break;

    case "POST":
        $task = json_decode(file_get_contents('php://input'));
        $sql = "INSERT INTO tasks(id, title, description, created_at, updated_at) VALUES(null, :title, :description, :created_at, :updated_at)";
        $stmt = $conn->prepare($sql);
        $created_at = date('Y-m-d H:i:s');
        $updated_at = date('Y-m-d H:i:s');

        $stmt->bindParam(':title', $task->title);
        $stmt->bindParam(':description', $task->description);
        $stmt->bindParam(':created_at', $created_at);
        $stmt->bindParam(':updated_at', $updated_at);
        
        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Запись успешно прошла.'];
        } else {
            $response = ['status' => 0, 'message' => 'Запись не прошла.'];
        }
        echo json_encode($response);
        break;   

    case "PUT":
        $task = json_decode( file_get_contents('php://input') );
        $sql = "UPDATE tasks SET title=:title, description=:description, updated_at =:updated_at WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $updated_at = date('Y-m-d H:i:s');
        $stmt->bindParam(':id', $task->id);
        $stmt->bindParam(':title', $task->title);
        $stmt->bindParam(':description', $task->description);
        $stmt->bindParam(':updated_at', $updated_at);
  
        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Запись успешно прошла.'];
        } else {
            $response = ['status' => 0, 'message' => 'Запись не прошла.'];
        }
        echo json_encode($response);
        break;  

    case "DELETE":
        $sql = "DELETE FROM tasks WHERE id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);
    
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[4]);
    
        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Запись успешно удалена.'];
        } else {
            $response = ['status' => 0, 'message' => 'Ошибка удаления.'];
        }
        echo json_encode($response);
        break;
}
?>