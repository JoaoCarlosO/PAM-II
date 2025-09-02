<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$conn = new mysqli("localhost", "root", "", "chatdb");
if ($conn->connect_error) {
    die(json_encode(["erro" => "Falha na conexão: " . $conn->connect_error]));
}

$input = json_decode(file_get_contents("php://input"), true);
$usuario = $conn->real_escape_string($input['usuario']);

$sql = "UPDATE mensagens SET status = 'lido' WHERE usuario != '$usuario' AND status = 'entregue'";
$conn->query($sql);

echo json_encode(["sucesso" => true]);
$conn->close();
