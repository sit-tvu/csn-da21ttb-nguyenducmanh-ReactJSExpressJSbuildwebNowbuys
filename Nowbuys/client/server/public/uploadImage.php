
<?php  

      header('Content-Type: application/json; charset=utf-8');
      header('Access-Control-Allow-Origin: *');
      header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
      header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
      header('Content-Type: application/json');
      $method = $_SERVER['REQUEST_METHOD'];
      if ($method == "OPTIONS") {
            header('Access-Control-Allow-Origin: *');
            header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
            header("HTTP/1.1 200 OK");
            die();
      }
      
      if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (isset($_FILES['file'])) {
            $name = $_FILES["file"]["name"];
            $size = $_FILES["file"]["size"];
            $extArr = explode(".", $name);
            $ext= $extArr[1];
            $allowed_ext = array("png", "jpg", "jpeg");
    
            if(in_array($ext, $allowed_ext)) {
                if($size < (1024*1024*10)) { // Kilobyte = 10MB
                    $new_image = '';
        
                    $target_dir = dirname(__FILE__);
                    $path = $target_dir.'/User'.'/'.basename($_FILES["file"]["name"]);
        
                    list($width, $height) = getimagesize($_FILES["file"]["tmp_name"]);
        
                    if($ext == 'png') {
                        $new_image = imagecreatefrompng($_FILES["file"]["tmp_name"]);
                    }
                    if($ext == 'jpg' || $ext == 'jpeg') {  
                        $new_image = imagecreatefromjpeg($_FILES["file"]["tmp_name"]);  
                    }
        
                    $new_width = 200;
                    $new_height = ($height/$width)*200;
                    $tmp_image = imagecreatetruecolor($new_width, $new_height);
                    imagecopyresampled($tmp_image, $new_image, 0, 0, 0, 0, $new_width, $new_height, $width, $height);
                    imagejpeg($tmp_image, $path, 100);
                    imagedestroy($new_image);
                    imagedestroy($tmp_image);
        
                    $response = array(
                        'message' => 'Resize and save image is successful',
                        'isUpload' => true
                    );
                    header('Content-Type: application/json');
                    echo json_encode($response);
                } else {
                    $response = array(
                        'message' => 'Size of file is more than 10MB',
                        'isUpload' => false
                    );
                    header('Content-Type: application/json');
                    echo json_encode($response);
                }
            } else {
                $response = array(
                    'message' => 'The file upload is invalid',
                    'isUpload' => true
                );
                header('Content-Type: application/json');
                echo json_encode($response);
            }
        } else {
            $response = array(
                'message' => 'File in payload is empty',
                'isUpload' => true
            );
            header('Content-Type: application/json');
            echo json_encode($response);
        }
    } else {
        $response = array(
            'message' => 'Method not allowed',
            'isUpload' => false
        );
        header('Content-Type: application/json');
        echo json_encode($response);
    }
?>
