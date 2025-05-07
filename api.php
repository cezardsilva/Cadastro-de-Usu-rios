<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

$conexao = new mysqli("localhost", "cdsconsu_sysadmin", "@CDias2015", "cdsconsu_afiliados");

if ($conexao->connect_error) {
    die("Falha na conexão: " . $conexao->connect_error);
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $query = $conexao->query("SELECT * FROM usuarios");
        echo json_encode($query->fetch_all(MYSQLI_ASSOC));
        break;
        
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $conexao->prepare("INSERT INTO usuarios (nome, idade, email, telefone) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("siss", $data['nome'], $data['idade'], $data['email'], $data['telefone']);
        $stmt->execute();
        echo json_encode(['success' => true]);
        break;
        
    case 'DELETE':
        $id = explode('/', $_SERVER['REQUEST_URI'])[3]; // Pega o ID da URL
        $stmt = $conexao->prepare("DELETE FROM usuarios WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        echo json_encode(['success' => true]);
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método não permitido']);
}
?>