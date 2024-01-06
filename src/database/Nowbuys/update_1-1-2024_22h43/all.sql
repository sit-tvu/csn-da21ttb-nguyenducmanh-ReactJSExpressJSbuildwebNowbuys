-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 01, 2024 at 03:41 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nowbuys`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteOldOTP` ()   BEGIN
    DECLARE delete_time TIMESTAMP;
    SET delete_time = NOW() - INTERVAL 5 MINUTE;
    DELETE FROM otp WHERE created_at < delete_time;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `consignee_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `consignee_phone` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `province_id` int NOT NULL,
  `province_name` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `district_id` int NOT NULL,
  `district_name` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ward_id` int NOT NULL,
  `ward_name` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `desc_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `type` int DEFAULT NULL,
  `is_default` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`id`, `user_id`, `consignee_name`, `consignee_phone`, `province_id`, `province_name`, `district_id`, `district_name`, `ward_id`, `ward_name`, `desc_address`, `type`, `is_default`) VALUES
(1, 100537050, 'Nguyễn Đức Mạnh', '0868818614', 54, 'Trà Vinh', 611, 'Châu Thành', 9571, 'Hoà Lợi', 'Nhà trọ Thành Trung cạnh cầu Bản ABC', 2, 0),
(2, 100537052, 'Lý Nam Tiến', '08367461273', 55, 'Vĩnh Long', 617, 'Long Hồ', 9637, '', 'Cạnh công ty Acecook Việt Nam', 1, 1),
(3, 100537050, 'Nguyễn Đức Tài', '0866398416', 54, 'Trà Vinh', 610, 'Tiểu Cần', 9559, 'Tập Ngãi', 'Ngay cua trước móng đường xuống cầu Hai Văn', 1, 0),
(6, 100537050, 'Dương Tiến Đạt', '0356728933', 55, 'Tỉnh Vĩnh Long', 619, 'Huyện Vũng Liêm', 9675, 'Xã Trung Nghĩa', 'Cạnh trạm dừng chân tuyến sô 9 thuộc quốc lộ 1A', 1, 0),
(19, 100537050, 'Nguyễn Đức Mạnh', '0868818614', 59, 'Thành phố Cần Thơ', 667, 'Huyện Vĩnh Thạnh', 10222, 'Xã Thạnh Lợi', 'ádasd', 1, 0),
(20, 100537050, 'Nguyễn Đức Mạnh', '0868818614', 54, 'Tỉnh Trà Vinh', 609, 'Huyện Cầu Kè', 9545, 'Xã Ninh Thới', 'Biết nhà làm chi :V', 2, 1),
(29, 100537105, 'Nguyễn Đức Mạnh', '0868818614', 4, 'Tỉnh Bắc Kạn', 56, 'Huyện Bạch Thông', 981, 'Xã Đôn Phong', 'khjk', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `brand`
--

CREATE TABLE `brand` (
  `id` int NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `brand`
--

INSERT INTO `brand` (`id`, `name`) VALUES
(1, 'Apple'),
(2, 'Samsung'),
(3, 'OPPO'),
(4, 'Xiaomi'),
(5, 'Asus'),
(6, 'Dell'),
(7, 'LG'),
(8, 'Lenovo');

-- --------------------------------------------------------

--
-- Table structure for table `brand_catelogy`
--

CREATE TABLE `brand_catelogy` (
  `id` int NOT NULL,
  `catelogy_id` int DEFAULT NULL,
  `brand_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `brand_catelogy`
--

INSERT INTO `brand_catelogy` (`id`, `catelogy_id`, `brand_id`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 4, 1),
(4, 1, 2),
(5, 3, 2),
(6, 5, 2),
(7, 6, 2),
(8, 1, 3),
(9, 3, 3),
(10, 6, 3),
(11, 1, 4),
(12, 3, 4),
(13, 2, 5),
(14, 5, 5),
(15, 2, 6),
(16, 5, 6),
(17, 2, 7),
(18, 5, 7),
(19, 2, 8),
(20, 3, 8);

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` bigint NOT NULL,
  `user_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `number` tinyint DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `product_id`, `number`, `created_at`, `updated_at`) VALUES
(1, 100537052, 32, 1, '2023-08-23 03:43:55', '2023-08-23 10:44:11'),
(2, 100537052, 19, 1, '2023-08-23 03:43:55', '2023-08-23 10:44:11'),
(3, 100537052, 2, 1, '2023-08-23 03:43:55', '2023-08-23 10:44:11'),
(4, 100537052, 66, 1, '2023-08-23 03:43:55', '2023-08-23 10:44:11'),
(5, 100537052, 45, 1, '2023-08-23 03:43:55', '2023-08-23 10:44:11'),
(6, 100537052, 22, 1, '2023-08-23 03:43:55', '2023-08-23 10:44:11'),
(7, 100537052, 11, 1, '2023-08-23 03:43:55', '2023-08-23 10:44:11'),
(8, 100537052, 80, 1, '2023-08-23 03:43:55', '2023-08-23 10:44:11'),
(9, 100537052, 87, 1, '2023-08-23 03:43:55', '2023-08-23 10:44:11'),
(466, 100537105, 35, 1, '2023-12-10 14:16:06', '2023-12-10 21:16:06'),
(467, 100537105, 36, 1, '2023-12-10 14:16:11', '2023-12-10 21:16:11'),
(473, 100537050, 2, 2, '2023-12-19 01:28:05', '2023-12-19 08:29:55'),
(474, 100537050, 1, 5, '2023-12-19 01:28:07', '2023-12-19 08:43:05'),
(475, 100537050, 7, 1, '2023-12-19 01:28:11', '2023-12-19 08:28:11');

-- --------------------------------------------------------

--
-- Table structure for table `catelogy`
--

CREATE TABLE `catelogy` (
  `id` int NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `thumbnail_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `catelogy`
--

INSERT INTO `catelogy` (`id`, `name`, `thumbnail_url`) VALUES
(1, 'Điện thoại', 'http://localhost:8000/static/global/overview/portfolio/phone.png'),
(2, 'Laptop', 'http://localhost:8000/static/global/overview/portfolio/laptop.png'),
(3, 'Máy tính bảng', 'http://localhost:8000/static/global/overview/portfolio/tablet.png'),
(4, 'Ipad', 'http://localhost:8000/static/global/overview/portfolio/ipad.png'),
(5, 'Màn hình máy tính', 'http://localhost:8000/static/global/overview/portfolio/screen-PC.png'),
(6, 'Đồng hồ thông minh', 'http://localhost:8000/static/global/overview/portfolio/smart-watch.png'),
(7, 'Đồng hồ thời trang', 'http://localhost:8000/static/global/overview/portfolio/watch.png');

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `star` tinyint DEFAULT NULL,
  `comment` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`id`, `user_id`, `product_id`, `star`, `comment`, `created_at`, `updated_at`) VALUES
(1, 100537053, 1, 5, 'Sản phẩm dùng rất mượt mà, đẹp nữa chứ. Mua về chụp ảnh quay phim như máy ảnh :>>', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(2, 100537053, 3, 4, 'Nhân viên tư vấn nhiệt tình nên chọn cho mình con máy quá tuyệt vời và phù hợp', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(3, 100537053, 4, 3, 'Chiếc máy thật xịn xò, camera chỉ có 12MP nhưng chụp ảnh rất đẹp, quay phim thì phải nói là chỉ thua máy ảnh nhưng thích màu đỏ mà Nowbuys bán chạy quá nên còn mỗi màu này :<<', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(4, 100537053, 6, 5, 'Máy đẹp, màn hình sáng, đầy đủ tính năng, camera chụp hình đẹp. Tôi rất hài lòng với sản phẩm này.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(5, 100537054, 2, 4, 'Máy chạy rất nhanh và mượt, chụp ảnh đẹp, có nhiều tính năng hữu ích. Tuy nhiên, pin hơi yếu.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(6, 100537054, 6, 5, 'Mình rất hài lòng với chiếc điện thoại này. Thiết kế đẹp, hiệu năng mạnh mẽ, camera chụp ảnh đẹp và sắc nét. Đặc biệt là pin rất trâu và sạc nhanh. Sản phẩm đáng mua!', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(7, 100537054, 4, 4, 'Máy nhẹ, dễ cầm, cấu hình tốt, camera chụp hình đẹp, âm thanh hay. Chỉ có điểm trừ là pin không được tốt lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(8, 100537054, 5, 3, 'Máy tạm được, nhưng không thật sự ấn tượng. Cấu hình chưa được mạnh lắm, pin yếu. Camera chụp hình cũng bình thường.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(9, 100537055, 2, 3, 'Máy khá tốt, chụp ảnh đẹp, nhưng cảm giác chất lượng vỏ máy không tốt lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(10, 100537055, 7, 4, 'Điện thoại này cũng tốt đấy, màn hình đẹp, camera chụp ảnh tốt, cấu hình mạnh mẽ. Tuy nhiên, thời lượng pin không được ấn tượng lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(11, 100537055, 9, 4, 'Máy tốt, đáp ứng được nhu cầu sử dụng cơ bản. Camera chụp hình đẹp, âm thanh hay. Pin trâu. Giá cả hợp lý.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(12, 100537055, 10, 5, 'Máy tuyệt vời! Cấu hình mạnh, camera chụp hình rõ nét, màn hình sáng đẹp. Pin khá tốt. Tôi rất hài lòng với sản phẩm này.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(13, 100537056, 6, 5, 'Máy chạy rất nhanh và mượt, chụp ảnh đẹp, âm thanh to và rõ. Tôi rất hài lòng với sản phẩm này.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(14, 100537056, 4, 5, 'Điện thoại chạy rất mượt, cấu hình tốt. Camera chụp ảnh đẹp và quay phim rõ nét. Màn hình sáng đẹp. Giá hơi cao nhưng đáng để sở hữu.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(15, 100537056, 9, 3, 'Máy chạy ổn định và chụp ảnh đẹp, nhưng màn hình không sáng bằng các sản phẩm khác trong tầm giá.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(16, 100537056, 11, 2, 'Máy tệ. Pin không tốt, camera chụp hình xấu, cấu hình yếu. Tôi không thể khuyến khích sản phẩm này.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(17, 100537057, 1, 2, 'Máy chụp ảnh đẹp, nhưng vì tôi cần sử dụng nhiều ứng dụng nên thấy máy hơi chậm và pin hơi yếu.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(18, 100537057, 8, 3, 'Mua điện thoại này được 1 tháng rồi, dùng thì ok nhưng chụp ảnh không được sắc nét lắm. Pin thì không ổn định, phải sạc nhiều lần trong ngày. Chỉ được cái giá rẻ.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(19, 100537057, 2, 4, 'Mua sản phẩm với giá khá rẻ và dùng cũng ổn định. Camera chụp ảnh không đẹp lắm nhưng đáp ứng được nhu cầu sử dụng của mình.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(20, 100537057, 12, 4, 'Máy khá tốt. Cấu hình đủ dùng, camera chụp hình tốt. Pin trâu, chạy được nhiều ứng dụng cùng lúc. Giá cả hợp lý.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(21, 100537058, 9, 5, 'Chiếc điện thoại này quá tuyệt vời, thiết kế đẹp, hiệu năng tuyệt vời, chụp ảnh đẹp và sắc nét. Còn pin thì khỏi phải nói, trâu bò, sạc cực nhanh. Tôi hoàn toàn hài lòng với sản phẩm này.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(22, 100537058, 6, 2, 'Máy chạy chậm và hay bị giật. Camera hơi tệ và màn hình không đẹp. Không nên mua sản phẩm này.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(23, 100537058, 13, 3, 'Máy ổn, không có gì đặc biệt. Cấu hình tương đối, camera chụp hình bình thường. Pin trâu. Giá cả phải chăng.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(24, 100537059, 37, 2, 'Chiếc điện thoại này có tính năng cơ bản tốt, tuy nhiên màn hình không được rõ ràng và độ phân giải hình ảnh thấp.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(25, 100537059, 10, 4, 'Mình mua chiếc điện thoại này được 2 tuần rồi, dùng thì ok, camera chụp ảnh đẹp, hiệu năng cũng tốt. Pin thì trâu, nhưng thỉnh thoảng lại bị giật và xuống nhanh hơn bình thường.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(26, 100537059, 3, 3, 'Mua máy tại Nowbuys vì được hỗ trợ tư vấn khá tốt. Máy dùng ổn định nhưng chụp ảnh không được rõ nét lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(27, 100537060, 2, 2, 'Mình mua con này thấy giá rẻ mà cũng được nhưng mà không phải lúc nào cũng như ý muốn, nhất là khi cần chụp ảnh màu sắc thật tươi sáng', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(28, 100537060, 5, 5, 'Điện thoại vừa đẹp vừa tốt. Camera chụp hình đẹp, tốc độ truy cập nhanh, pin cũng tốt. Có đèn flash nên chụp ảnh trong đêm cũng rất tuyệt vời. Giá hợp lý cho chất lượng tốt như vậy.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(29, 100537060, 11, 3, 'Mình thấy điện thoại này khá ổn, nhưng thật sự không đáng giá tiền bỏ ra. Máy chạy mượt, camera cũng khá ok, nhưng pin thì quá yếu và chơi game mát máy quá nhiều.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(30, 100537060, 31, 3, 'Máy đẹp, tuy nhiên tốc độ đáp ứng chậm, camera chụp hình tệ. Pin yếu và không có nhiều tính năng hữu ích. Giá cả cũng khá đắt.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(31, 100537061, 6, 4, 'Sản phẩm chất lượng, vẻ ngoài bắt mắt. Camera ấn tượng, với khả năng zoom rất tốt. Pin cũng ổn định và sử dụng trong thời gian dài. Chỉ tiếc là không có khe cắm tai nghe 3.5mm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(32, 100537061, 7, 5, 'Mình rất hài lòng với chiếc điện thoại này. Thiết kế đẹp mắt, màn hình sáng, chất lượng âm thanh tốt và đặc biệt là pin trâu. Giá cả phải chăng và đáng đồng tiền bát gạo.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(33, 100537061, 1, 5, 'Điện thoại chất lượng cao, cấu hình tốt. Camera rõ nét, màn hình sáng đẹp. Giá hơi cao nhưng xứng đáng với giá trị của sản phẩm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(34, 100537062, 5, 2, 'Máy không ổn định, nóng khi sử dụng, pin sạc chậm và giá hơi cao so với chất lượng.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(35, 100537062, 11, 3, 'Máy chạy được, chụp hình cũng được nhưng không thể nào so sánh được với các dòng cao cấp hơn. Pin thì chỉ được ở mức trung bình, không ấn tượng. Giá cả thì cũng không hề rẻ.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(36, 100537062, 8, 4, 'Máy khá ổn về mọi mặt, màn hình sáng đẹp, chụp ảnh tốt. Điểm trừ là pin hơi kém.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(37, 100537062, 4, 4, 'Máy đẹp, hiệu năng tốt, camera chụp hình đẹp, tuy nhiên không có nhiều tính năng hữu ích. Pin tạm được. Giá cả hợp lý với chất lượng.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(38, 100537063, 1, 4, 'Máy dùng tốt, cấu hình mạnh mẽ, màn hình sáng đẹp, tuy nhiên cảm giác cầm trong tay hơi trơn và không có tai nghe trong hộp.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(39, 100537063, 9, 4, 'Máy chạy rất mượt, chụp ảnh đẹp và cảm ứng nhạy. Điểm trừ duy nhất là dung lượng pin không được ấn tượng lắm. Tuy nhiên, giá cả lại rất hợp lý.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(40, 100537063, 17, 4, 'Mình đã dùng chiếc điện thoại này trong một thời gian và thấy rất ổn. Chụp hình đẹp, chất lượng âm thanh tốt và giá cả phải chăng. Pin cũng tương đối trâu. Tuy nhiên, cảm ứng không được nhạy lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(41, 100537063, 9, 4, 'Máy đẹp, mỏng nhẹ, hiệu năng tốt, camera chụp hình đẹp. Màn hình cũng rất sáng. Chỉ có điểm yếu là pin hơi chưa tốt.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(42, 100537064, 2, 5, 'Điện thoại tuyệt vời, màu sắc đẹp, hiệu năng cao, camera rõ nét và quay phim tuyệt vời. Rất hài lòng với sản phẩm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(43, 100537064, 13, 4, 'Máy chạy mượt, thiết kế đẹp và chụp ảnh tốt. Có một vài tính năng hay nhưng cũng có một số tính năng không cần thiết. Tuy nhiên, giá cả lại hợp lý.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(44, 100537064, 15, 2, 'Mình mua chiếc điện thoại này vì giá rẻ nhưng cảm giác như đang dùng máy tính cùi bắp. Màn hình mờ, chụp hình tệ, cảm ứng chậm và pin nhanh hết. Không đáng tiền cho dù giá rẻ.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(45, 100537064, 12, 5, 'Máy cực đẹp, màn hình rực rỡ và sắc nét. Tốc độ đáp ứng cực nhanh và hiệu năng mạnh mẽ. Camera chụp hình tuyệt vời. Pin cũng tốt. Rất đáng để sở hữu.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(46, 100537065, 4, 4, 'Sản phẩm tốt, màn hình đẹp, camera tốt. Nhưng nếu có hỗ trợ thêm thẻ nhớ nữa thì tuyệt vời hơn.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(47, 100537065, 1, 4, 'Sản phẩm khá đẹp và giá cả phải chăng. Camera chụp hình đẹp, tốc độ truy cập nhanh. Pin cũng khá tốt. Tuy nhiên, không có đèn flash nên chụp ảnh trong đêm không được tốt lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(48, 100537065, 4, 3, 'Máy ảnh không tốt cho lắm, nhưng đây là một sản phẩm tốt với giá cả hợp lý. Nó cũng có nhiều tính năng đáng giá. Tốc độ truy cập cũng khá nhanh. Tôi khá hài lòng với sản phẩm này.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(49, 100537065, 7, 2, 'Máy khá đẹp, tuy nhiên tốc độ đáp ứng chậm, camera chụp hình tệ, không có tính năng hữu ích. Pin cũng rất yếu. Không đáng mua.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(50, 100537066, 3, 3, 'Sản phẩm tương đối tốt, camera đẹp, màn hình sáng, tuy nhiên pin hơi yếu và cảm giác cầm máy không được chắc chắn.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(51, 100537066, 2, 3, 'Sản phẩm không tệ lắm nhưng cũng không đáng giá tiền bạc bỏ ra. Không thể chụp ảnh đẹp được như mong muốn, tốc độ cũng chưa được nhanh lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(52, 100537066, 5, 4, 'Điện thoại này khá đẹp và giá cả phải chăng. Camera chụp hình tốt, tốc độ truy cập nhanh. Pin cũng khá tốt. Tuy nhiên, không có đèn flash nên chụp ảnh trong đêm không được tốt lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(53, 100537066, 13, 4, 'Máy chạy mượt, thiết kế đẹp và chụp ảnh tốt. Có một vài tính năng hay nhưng cũng có một số tính năng không cần thiết. Tuy nhiên, giá cả lại hợp lý.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(54, 100537066, 3, 3, 'Máy nhìn cũng được, tốc độ đáp ứng nhanh, nhưng pin yếu. Camera chụp ảnh tạm được nhưng không có gì đặc biệt.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(55, 100537067, 2, 3, 'Sản phẩm không tệ lắm nhưng cũng không đáng giá tiền bạc bỏ ra. Không thể chụp ảnh đẹp được như mong muốn, tốc độ cũng chưa được nhanh lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(56, 100537067, 9, 4, 'Điện thoại này khá đẹp và giá cả phải chăng. Camera chụp hình tốt, tốc độ truy cập nhanh. Pin cũng khá tốt. Tuy nhiên, không có đèn flash nên chụp ảnh trong đêm không được tốt lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(57, 100537067, 3, 4, 'Máy chạy mượt, thiết kế đẹp và chụp ảnh tốt. Có một vài tính năng hay nhưng cũng có một số tính năng không cần thiết. Tuy nhiên, giá cả lại hợp lý.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(58, 100537068, 17, 3, 'Sản phẩm không tệ lắm nhưng cũng không đáng giá tiền bạc bỏ ra. Không thể chụp ảnh đẹp được như mong muốn, tốc độ cũng chưa được nhanh lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(59, 100537068, 7, 4, 'Điện thoại này khá đẹp và giá cả phải chăng. Camera chụp hình tốt, tốc độ truy cập nhanh. Pin cũng khá tốt. Tuy nhiên, không có đèn flash nên chụp ảnh trong đêm không được tốt lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(60, 100537068, 22, 4, 'Máy chạy mượt, thiết kế đẹp và chụp ảnh tốt. Có một vài tính năng hay nhưng cũng có một số tính năng không cần thiết. Tuy nhiên, giá cả lại hợp lý.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(61, 100537069, 26, 3, 'Sản phẩm không tệ lắm nhưng cũng không đáng giá tiền bạc bỏ ra. Không thể chụp ảnh đẹp được như mong muốn, tốc độ cũng chưa được nhanh lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(62, 100537069, 35, 4, 'Điện thoại này khá đẹp và giá cả phải chăng. Camera chụp hình tốt, tốc độ truy cập nhanh. Pin cũng khá tốt. Tuy nhiên, không có đèn flash nên chụp ảnh trong đêm không được tốt lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(63, 100537069, 30, 4, 'Máy chạy mượt, thiết kế đẹp và chụp ảnh tốt. Có một vài tính năng hay nhưng cũng có một số tính năng không cần thiết. Tuy nhiên, giá cả lại hợp lý.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(64, 100537070, 8, 3, 'Sản phẩm không tệ lắm nhưng cũng không đáng giá tiền bạc bỏ ra. Không thể chụp ảnh đẹp được như mong muốn, tốc độ cũng chưa được nhanh lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(65, 100537070, 18, 4, 'Điện thoại này khá đẹp và giá cả phải chăng. Camera chụp hình tốt, tốc độ truy cập nhanh. Pin cũng khá tốt. Tuy nhiên, không có đèn flash nên chụp ảnh trong đêm không được tốt lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(66, 100537070, 21, 4, 'Máy chạy mượt, thiết kế đẹp và chụp ảnh tốt. Có một vài tính năng hay nhưng cũng có một số tính năng không cần thiết. Tuy nhiên, giá cả lại hợp lý.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(67, 100537071, 24, 3, 'Sản phẩm không tệ lắm nhưng cũng không đáng giá tiền bạc bỏ ra. Không thể chụp ảnh đẹp được như mong muốn, tốc độ cũng chưa được nhanh lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(68, 100537071, 23, 4, 'Điện thoại này khá đẹp và giá cả phải chăng. Camera chụp hình tốt, tốc độ truy cập nhanh. Pin cũng khá tốt. Tuy nhiên, không có đèn flash nên chụp ảnh trong đêm không được tốt lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(69, 100537071, 34, 4, 'Máy chạy mượt, thiết kế đẹp và chụp ảnh tốt. Có một vài tính năng hay nhưng cũng có một số tính năng không cần thiết. Tuy nhiên, giá cả lại hợp lý.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(70, 100537072, 29, 3, 'Sản phẩm không tệ lắm nhưng cũng không đáng giá tiền bạc bỏ ra. Không thể chụp ảnh đẹp được như mong muốn, tốc độ cũng chưa được nhanh lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(71, 100537072, 10, 4, 'Điện thoại này khá đẹp và giá cả phải chăng. Camera chụp hình tốt, tốc độ truy cập nhanh. Pin cũng khá tốt. Tuy nhiên, không có đèn flash nên chụp ảnh trong đêm không được tốt lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(72, 100537072, 18, 4, 'Máy chạy mượt, thiết kế đẹp và chụp ảnh tốt. Có một vài tính năng hay nhưng cũng có một số tính năng không cần thiết. Tuy nhiên, giá cả lại hợp lý.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(73, 100537073, 32, 3, 'Sản phẩm không tệ lắm nhưng cũng không đáng giá tiền bạc bỏ ra. Không thể chụp ảnh đẹp được như mong muốn, tốc độ cũng chưa được nhanh lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(74, 100537073, 31, 4, 'Điện thoại này khá đẹp và giá cả phải chăng. Camera chụp hình tốt, tốc độ truy cập nhanh. Pin cũng khá tốt. Tuy nhiên, không có đèn flash nên chụp ảnh trong đêm không được tốt lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(75, 100537073, 37, 4, 'Máy chạy mượt, thiết kế đẹp và chụp ảnh tốt. Có một vài tính năng hay nhưng cũng có một số tính năng không cần thiết. Tuy nhiên, giá cả lại hợp lý.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(76, 100537074, 36, 3, 'Sản phẩm không tệ lắm nhưng cũng không đáng giá tiền bạc bỏ ra. Không thể chụp ảnh đẹp được như mong muốn, tốc độ cũng chưa được nhanh lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(77, 100537074, 29, 4, 'Điện thoại này khá đẹp và giá cả phải chăng. Camera chụp hình tốt, tốc độ truy cập nhanh. Pin cũng khá tốt. Tuy nhiên, không có đèn flash nên chụp ảnh trong đêm không được tốt lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(78, 100537074, 28, 4, 'Máy chạy mượt, thiết kế đẹp và chụp ảnh tốt. Có một vài tính năng hay nhưng cũng có một số tính năng không cần thiết. Tuy nhiên, giá cả lại hợp lý.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(79, 100537075, 24, 3, 'Sản phẩm không tệ lắm nhưng cũng không đáng giá tiền bạc bỏ ra. Không thể chụp ảnh đẹp được như mong muốn, tốc độ cũng chưa được nhanh lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(80, 100537075, 10, 4, 'Điện thoại này khá đẹp và giá cả phải chăng. Camera chụp hình tốt, tốc độ truy cập nhanh. Pin cũng khá tốt. Tuy nhiên, không có đèn flash nên chụp ảnh trong đêm không được tốt lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(81, 100537075, 12, 4, 'Máy chạy mượt, thiết kế đẹp và chụp ảnh tốt. Có một vài tính năng hay nhưng cũng có một số tính năng không cần thiết. Tuy nhiên, giá cả lại hợp lý.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(82, 100537076, 25, 3, 'Sản phẩm không tệ lắm nhưng cũng không đáng giá tiền bạc bỏ ra. Không thể chụp ảnh đẹp được như mong muốn, tốc độ cũng chưa được nhanh lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(83, 100537076, 27, 4, 'Điện thoại này khá đẹp và giá cả phải chăng. Camera chụp hình tốt, tốc độ truy cập nhanh. Pin cũng khá tốt. Tuy nhiên, không có đèn flash nên chụp ảnh trong đêm không được tốt lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(84, 100537076, 20, 4, 'Máy chạy mượt, thiết kế đẹp và chụp ảnh tốt. Có một vài tính năng hay nhưng cũng có một số tính năng không cần thiết. Tuy nhiên, giá cả lại hợp lý.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(85, 100537077, 30, 3, 'Sản phẩm không tệ lắm nhưng cũng không đáng giá tiền bạc bỏ ra. Không thể chụp ảnh đẹp được như mong muốn, tốc độ cũng chưa được nhanh lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(86, 100537077, 15, 4, 'Điện thoại này khá đẹp và giá cả phải chăng. Camera chụp hình tốt, tốc độ truy cập nhanh. Pin cũng khá tốt. Tuy nhiên, không có đèn flash nên chụp ảnh trong đêm không được tốt lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(87, 100537077, 19, 4, 'Máy chạy mượt, thiết kế đẹp và chụp ảnh tốt. Có một vài tính năng hay nhưng cũng có một số tính năng không cần thiết. Tuy nhiên, giá cả lại hợp lý.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(88, 100537078, 17, 3, 'Sản phẩm không tệ lắm nhưng cũng không đáng giá tiền bạc bỏ ra. Không thể chụp ảnh đẹp được như mong muốn, tốc độ cũng chưa được nhanh lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(89, 100537078, 8, 4, 'Điện thoại này khá đẹp và giá cả phải chăng. Camera chụp hình tốt, tốc độ truy cập nhanh. Pin cũng khá tốt. Tuy nhiên, không có đèn flash nên chụp ảnh trong đêm không được tốt lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(90, 100537078, 11, 4, 'Máy chạy mượt, thiết kế đẹp và chụp ảnh tốt. Có một vài tính năng hay nhưng cũng có một số tính năng không cần thiết. Tuy nhiên, giá cả lại hợp lý.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(91, 100537079, 22, 3, 'Sản phẩm không tệ lắm nhưng cũng không đáng giá tiền bạc bỏ ra. Không thể chụp ảnh đẹp được như mong muốn, tốc độ cũng chưa được nhanh lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(92, 100537079, 35, 4, 'Điện thoại này khá đẹp và giá cả phải chăng. Camera chụp hình tốt, tốc độ truy cập nhanh. Pin cũng khá tốt. Tuy nhiên, không có đèn flash nên chụp ảnh trong đêm không được tốt lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(93, 100537079, 13, 4, 'Máy chạy mượt, thiết kế đẹp và chụp ảnh tốt. Có một vài tính năng hay nhưng cũng có một số tính năng không cần thiết. Tuy nhiên, giá cả lại hợp lý.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(94, 100537080, 2, 3, 'Sản phẩm không tệ lắm nhưng cũng không đáng giá tiền bạc bỏ ra. Không thể chụp ảnh đẹp được như mong muốn, tốc độ cũng chưa được nhanh lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(95, 100537080, 12, 4, 'Điện thoại này khá đẹp và giá cả phải chăng. Camera chụp hình tốt, tốc độ truy cập nhanh. Pin cũng khá tốt. Tuy nhiên, không có đèn flash nên chụp ảnh trong đêm không được tốt lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(96, 100537080, 18, 4, 'Máy chạy mượt, thiết kế đẹp và chụp ảnh tốt. Có một vài tính năng hay nhưng cũng có một số tính năng không cần thiết. Tuy nhiên, giá cả lại hợp lý.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(97, 100537081, 30, 3, 'Sản phẩm không tệ lắm nhưng cũng không đáng giá tiền bạc bỏ ra. Không thể chụp ảnh đẹp được như mong muốn, tốc độ cũng chưa được nhanh lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(98, 100537081, 29, 4, 'Điện thoại này khá đẹp và giá cả phải chăng. Camera chụp hình tốt, tốc độ truy cập nhanh. Pin cũng khá tốt. Tuy nhiên, không có đèn flash nên chụp ảnh trong đêm không được tốt lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(99, 100537081, 17, 4, 'Máy chạy mượt, thiết kế đẹp và chụp ảnh tốt. Có một vài tính năng hay nhưng cũng có một số tính năng không cần thiết. Tuy nhiên, giá cả lại hợp lý.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(100, 100537082, 16, 3, 'Sản phẩm không tệ lắm nhưng cũng không đáng giá tiền bạc bỏ ra. Không thể chụp ảnh đẹp được như mong muốn, tốc độ cũng chưa được nhanh lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(101, 100537082, 31, 4, 'Điện thoại này khá đẹp và giá cả phải chăng. Camera chụp hình tốt, tốc độ truy cập nhanh. Pin cũng khá tốt. Tuy nhiên, không có đèn flash nên chụp ảnh trong đêm không được tốt lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(102, 100537082, 30, 4, 'Máy chạy mượt, thiết kế đẹp và chụp ảnh tốt. Có một vài tính năng hay nhưng cũng có một số tính năng không cần thiết. Tuy nhiên, giá cả lại hợp lý.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(103, 100537083, 18, 3, 'Sản phẩm không tệ lắm nhưng cũng không đáng giá tiền bạc bỏ ra. Không thể chụp ảnh đẹp được như mong muốn, tốc độ cũng chưa được nhanh lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(104, 100537083, 17, 4, 'Điện thoại này khá đẹp và giá cả phải chăng. Camera chụp hình tốt, tốc độ truy cập nhanh. Pin cũng khá tốt. Tuy nhiên, không có đèn flash nên chụp ảnh trong đêm không được tốt lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(105, 100537083, 27, 4, 'Máy chạy mượt, thiết kế đẹp và chụp ảnh tốt. Có một vài tính năng hay nhưng cũng có một số tính năng không cần thiết. Tuy nhiên, giá cả lại hợp lý.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(106, 100537084, 32, 3, 'Sản phẩm không tệ lắm nhưng cũng không đáng giá tiền bạc bỏ ra. Không thể chụp ảnh đẹp được như mong muốn, tốc độ cũng chưa được nhanh lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(107, 100537084, 8, 4, 'Điện thoại này khá đẹp và giá cả phải chăng. Camera chụp hình tốt, tốc độ truy cập nhanh. Pin cũng khá tốt. Tuy nhiên, không có đèn flash nên chụp ảnh trong đêm không được tốt lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(108, 100537084, 7, 4, 'Máy chạy mượt, thiết kế đẹp và chụp ảnh tốt. Có một vài tính năng hay nhưng cũng có một số tính năng không cần thiết. Tuy nhiên, giá cả lại hợp lý.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(109, 100537085, 33, 3, 'Sản phẩm không tệ lắm nhưng cũng không đáng giá tiền bạc bỏ ra. Không thể chụp ảnh đẹp được như mong muốn, tốc độ cũng chưa được nhanh lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(110, 100537085, 27, 4, 'Điện thoại này khá đẹp và giá cả phải chăng. Camera chụp hình tốt, tốc độ truy cập nhanh. Pin cũng khá tốt. Tuy nhiên, không có đèn flash nên chụp ảnh trong đêm không được tốt lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(111, 100537085, 29, 4, 'Máy chạy mượt, thiết kế đẹp và chụp ảnh tốt. Có một vài tính năng hay nhưng cũng có một số tính năng không cần thiết. Tuy nhiên, giá cả lại hợp lý.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(112, 100537086, 35, 3, 'Sản phẩm không tệ lắm nhưng cũng không đáng giá tiền bạc bỏ ra. Không thể chụp ảnh đẹp được như mong muốn, tốc độ cũng chưa được nhanh lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(113, 100537086, 31, 4, 'Điện thoại này khá đẹp và giá cả phải chăng. Camera chụp hình tốt, tốc độ truy cập nhanh. Pin cũng khá tốt. Tuy nhiên, không có đèn flash nên chụp ảnh trong đêm không được tốt lắm.', '2023-08-02 07:37:15', '2023-08-02 14:37:15'),
(114, 100537086, 33, 4, 'Máy chạy mượt, thiết kế đẹp và chụp ảnh tốt. Có một vài tính năng hay nhưng cũng có một số tính năng không cần thiết. Tuy nhiên, giá cả lại hợp lý.', '2023-08-02 07:37:15', '2023-08-02 14:37:15');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `ship_id` int DEFAULT NULL,
  `voucher_id` int DEFAULT NULL,
  `total_product_price` int NOT NULL,
  `nowbuys_coin` int NOT NULL,
  `total_payment_price` int NOT NULL,
  `payment_method` enum('banking','on_delivery') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'on_delivery',
  `state` enum('processing','transport','delivering','finished','canceled','warranty') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'processing',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `ship_id`, `voucher_id`, `total_product_price`, `nowbuys_coin`, `total_payment_price`, `payment_method`, `state`, `created_at`, `updated_at`) VALUES
(11, 100537050, 16, NULL, 520677600, 0, 520888550, 'on_delivery', 'processing', '2023-12-17 19:14:59', '2023-12-18 02:14:59'),
(12, 100537050, 17, NULL, 140274100, 0, 140403035, 'on_delivery', 'transport', '2023-12-17 19:15:33', '2023-12-18 22:21:53'),
(13, 100537050, 18, 1, 489606000, 543000, 480186253, 'on_delivery', 'processing', '2023-12-17 19:16:17', '2023-12-18 02:16:17'),
(14, 100537050, 19, 1, 55090500, 543000, 52012434, 'on_delivery', 'delivering', '2023-12-18 14:12:07', '2023-12-18 22:22:01'),
(15, 100537050, 20, NULL, 97117500, 543000, 96742507, 'on_delivery', 'processing', '2023-12-18 14:26:41', '2023-12-18 21:26:41'),
(16, 100537050, 21, 1, 18594000, 0, 17788977, 'on_delivery', 'processing', '2023-12-18 15:41:54', '2023-12-18 22:41:54'),
(17, 100537050, 22, 1, 14513400, 0, 13897947, 'on_delivery', 'processing', '2023-12-19 01:24:39', '2023-12-19 08:24:39'),
(18, 100537105, 23, 1, 23382700, 0, 22569823, 'on_delivery', 'processing', '2023-12-19 02:09:40', '2023-12-19 09:09:40');

-- --------------------------------------------------------

--
-- Table structure for table `order_products`
--

CREATE TABLE `order_products` (
  `id` int NOT NULL,
  `order_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `number_product_buy` int DEFAULT NULL,
  `price_of_one` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_products`
--

INSERT INTO `order_products` (`id`, `order_id`, `product_id`, `number_product_buy`, `price_of_one`) VALUES
(1, 11, 5, 1, 31071600),
(2, 11, 38, 5, 21840500),
(3, 11, 19, 1, 8443500),
(4, 11, 43, 4, 92990000),
(5, 12, 5, 1, 31071600),
(6, 12, 38, 5, 21840500),
(7, 13, 38, 5, 21840500),
(8, 13, 19, 1, 8443500),
(9, 13, 43, 4, 92990000),
(10, 14, 47, 1, 55090500),
(11, 15, 49, 1, 97117500),
(12, 16, 2, 1, 18594000),
(13, 17, 9, 1, 14513400),
(14, 18, 36, 1, 10191500),
(15, 18, 35, 1, 13191200);

-- --------------------------------------------------------

--
-- Table structure for table `otp`
--

CREATE TABLE `otp` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `otp` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `type` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int NOT NULL,
  `name_display` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `full_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `thumbnail_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `desc_short` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `price` int DEFAULT NULL,
  `discount_percentage` float DEFAULT NULL,
  `is_show_home` tinyint(1) DEFAULT NULL,
  `catelogy_id` int DEFAULT NULL,
  `brand_id` int DEFAULT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `number` smallint DEFAULT NULL,
  `is_delete` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name_display`, `full_name`, `thumbnail_url`, `desc_short`, `price`, `discount_percentage`, `is_show_home`, `catelogy_id`, `brand_id`, `slug`, `number`, `is_delete`, `created_at`, `updated_at`) VALUES
(1, 'IPhone 14 Pro Max', 'IPhone 14 Pro Max', 'http://localhost:8000/static/products/phones/products/iphone-14-pro-max.jpg', 'Dynamic Island ấn tượng, đột phá, khác biệt', 33590000, 40, 1, 1, 1, 'iphone-14-pro-max-nobw00-phone', 30, 0, '2023-07-30 03:48:22', '2023-12-12 15:03:02'),
(2, 'IPhone 14 Pro', 'IPhone 14 Pro', 'http://localhost:8000/static/products/phones/products/iphone-14-pro.jpg', 'Sở hữu vẻ đẹp và sức mạnh của Pro Max nhưng trong thân hình nhỏ gọn hơn', 30990000, 40, 1, 1, 1, 'iphone-14-pro-nobw01-phone', 30, 0, '2023-07-30 03:48:22', '2023-12-12 15:09:55'),
(3, 'IPhone 14 Plus', 'IPhone 14 Plus', 'http://localhost:8000/static/products/phones/products/iphone-14-plus.jpg', 'Sở hữu sức mạnh của dòng 14 series nhưng vẫn giữ lại tai thỏ huyền thoại một thời', 27990000, 7, 1, 1, 1, 'iphone-14-plus-nobw02-phone', 10, 0, '2023-07-30 03:48:22', '2023-07-31 20:01:36'),
(4, 'IPhone 14', 'IPhone 14', 'http://localhost:8000/static/products/phones/products/iphone-14.jpg', 'Những thông số cơ bản đáp ứng hầu hết mọi nhu cầu của dòng 14 serie', 24990000, 8, 0, 1, 1, 'iphone-14-nobw03-phone', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(5, 'IPhone 13 Pro Max', 'IPhone 13 Pro Max', 'http://localhost:8000/static/products/phones/products/iphone-13-pro-max.jpg', 'Cấu hình đột phá, cụm camera to hơn hứa hẹn chụp ảnh đẹp hơn', 36990000, 16, 1, 1, 1, 'iphone-13-pro-max-nobw04-phone', 10, 0, '2023-07-30 03:48:22', '2023-07-31 20:01:55'),
(6, 'IPhone 13 Pro', 'IPhone 13 Pro', 'http://localhost:8000/static/products/phones/products/iphone-13-pro.jpg', 'Phiên bản nhỏ gọn hơn của dòng 13 Pro Max, sức mạnh vẫn thế, cụm camera vẫn hoàn hảo', 33990000, 16, 0, 1, 1, 'iphone-13-pro-nobw05-phone', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(7, 'IPhone 13 Mini', 'IPhone 13 Mini', 'http://localhost:8000/static/products/phones/products/iphone-13-mini.jpg', 'Phù hợp hơn với phái đẹp, nhưng vẫn phục vụ tốt hầu hết các nhu cầu từ công việc đến giải trí', 21990000, 20, 1, 1, 1, 'iphone-13-mini-nobw06-phone', 10, 0, '2023-07-30 03:48:22', '2023-07-31 20:02:15'),
(8, 'IPhone 13', 'IPhone 13', 'http://localhost:8000/static/products/phones/products/iphone-13.jpg', 'Sự cân bằng hoàn hảo từ sức mạnh đến vẻ ngoài hoàn hảo của dòng 13 series', 24990000, 20, 0, 1, 1, 'iphone-13-nobw07-phone', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(9, 'IPhone 12 Mini', 'IPhone 12 Mini', 'http://localhost:8000/static/products/phones/products/iphone-12-mini.jpg', 'Kích thước cỡ dòng FE cũ nhưng vẫn có tai thỏ huyền thoại nhà Apple', 21990000, 34, 0, 1, 1, 'iphone-12-mini-nobw08-phone', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(10, 'IPhone 12', 'IPhone 12', 'http://localhost:8000/static/products/phones/products/iphone-12.jpg', 'Một chút hoài niệm về thiết kế cạnh viền vuông vứt, nhưng sức mạnh hiện đại bật nhất', 21990000, 15, 0, 1, 1, 'iphone-12-nobw09-phone', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(11, 'IPhone 11', 'IPhone 11', 'http://localhost:8000/static/products/phones/products/iphone-11.jpg', 'Một trong những dòng điện thoại hàng đầu của Apple, thiết bị nhẹ nhàng, mỏng, với màn hình tràn viền, phù hợp với người dùng trẻ', 14990000, 22, 0, 1, 1, 'iphone-11-nobw010-phone', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(12, 'Oppo Reno 8Z 5G', 'Oppo Reno 8Z 5G', 'http://localhost:8000/static/products/phones/products/oppo-reno-8z-5g.jpg', 'Một trong những sản phẩm mới của Oppo, thiết kế nhẹ nhàng và mỏng, tích hợp công nghệ 5G, màn hình tràn viền hấp dẫn cho người dùng trẻ', 10490000, 0.5, 1, 1, 3, 'oppo-reno-8z-5g-nobw011-phone', 10, 0, '2023-07-30 03:48:22', '2023-07-31 20:02:34'),
(13, 'Oppo Reno 8 5G', 'Oppo Reno 8 5G', 'http://localhost:8000/static/products/phones/products/oppo-reno-8-5g.jpg', 'Dòng điện thoại nổi bật của Oppo, thiết kế gọn gàng, sử dụng công nghệ 5G tiên tiến, màn hình tràn viền hấp dẫn đối với người dùng trẻ', 18990000, 0.5, 0, 1, 3, 'oppo-reno-8-5g-nobw012-phone', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(14, 'Oppo Reno 8', 'Oppo Reno 8', 'http://localhost:8000/static/products/phones/products/oppo-reno-8.jpg', 'Một trong những sản phẩm chất lượng của Oppo, thiết bị nhẹ, mỏng, với màn hình gần như không viền, thu hút người dùng trẻ', 8990000, 3, 0, 1, 3, 'oppo-reno-8-nobw013-phone', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(15, 'Oppo Reno 7Z 5G', 'Oppo Reno 7Z 5G', 'http://localhost:8000/static/products/phones/products/oppo-reno-7z-5g.jpg', 'Sản phẩm mới của Oppo, tích hợp công nghệ 5G, thiết kế nhẹ, mỏng và màn hình tràn viền hấp dẫn đối với người dùng trẻ', 9990000, 15, 1, 1, 3, 'oppo-reno-7z-5g-nobw014-phone', 10, 0, '2023-07-30 03:48:22', '2023-07-31 20:02:50'),
(16, 'Oppo Reno 7 Pro 5G', 'Oppo Reno 7 Pro 5G', 'http://localhost:8000/static/products/phones/products/oppo-reno-7-pro-5g.jpg', 'Dòng điện thoại cao cấp của Oppo, mang đến trải nghiệm 5G nhanh chóng, thiết kế thời trang với màn hình tràn viền, hấp dẫn với người dùng trẻ', 18990000, 21, 0, 1, 3, 'oppo-reno-7-pro-5g-nobw015-phone', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(17, 'Oppo Reno 7', 'Oppo Reno 7', 'http://localhost:8000/static/products/phones/products/oppo-reno-7.jpg', 'Sản phẩm đáng chú ý của Oppo, thiết kế nhỏ gọn, màn hình tràn viền sắc nét, phù hợp với người dùng trẻ', 7990000, 12, 0, 1, 3, 'oppo-reno-7-nobw016-phone', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(18, 'Oppo Reno 6 Pro', 'Oppo Reno 6 Pro', 'http://localhost:8000/static/products/phones/products/oppo-reno-6-pro.jpg', 'Dòng điện thoại tầm trung của Oppo, thiết kế mỏng, nhẹ, với màn hình tràn viền, thu hút người dùng trẻ', 14990000, 20, 1, 1, 3, 'oppo-reno-6-pro-nobw017-phone', 10, 0, '2023-07-30 03:48:22', '2023-07-31 20:03:04'),
(19, 'Oppo Reno 6', 'Oppo Reno 6', 'http://localhost:8000/static/products/phones/products/oppo-reno-6.jpg', 'Sản phẩm trẻ trung của Oppo, thiết bị nhẹ, mỏng, với màn hình đẹp, hấp dẫn đối với người dùng trẻ', 12990000, 35, 0, 1, 3, 'oppo-reno-6-nobw018-phone', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(20, 'Samsung Z Fold 4', 'Samsung Galaxy Z Fold 4', 'http://localhost:8000/static/products/phones/products/samsung-galaxy-z-fold-4-5g.jpg', 'Sản phẩm cao cấp của Samsung, điện thoại mỏng gọn, có khả năng gập lại, màn hình tràn viền, hấp dẫn với người dùng trẻ', 40990000, 7, 1, 1, 2, 'samsung-galaxy-z-fold-4-nobw019-phone', 10, 0, '2023-07-30 03:48:22', '2023-07-31 20:03:20'),
(21, 'Samsung Z Fold 3', 'Samsung Galaxy Z Fold 3', 'http://localhost:8000/static/products/phones/products/samsung-galaxy-z-fold-3-5g.jpg', 'Dòng điện thoại tiên tiến của Samsung, thiết kế nhẹ nhàng, có khả năng gập lại, màn hình tràn viền, phù hợp với người dùng trẻ', 41990000, 30, 0, 1, 2, 'samsung-galaxy-z-fold-3-nobw020-phone', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(22, 'Samsung Z Flip 4', 'Samsung Galaxy Z Flip 4', 'http://localhost:8000/static/products/phones/products/samsung-galaxy-z-flip-4-5g.jpg', 'Sản phẩm độc đáo của Samsung, điện thoại gập lại với thiết kế mỏng, màn hình tràn viền, thu hút sự quan tâm của người dùng trẻ', 25990000, 11, 1, 1, 2, 'samsung-galaxy-z-flip-4-nobw021-phone', 10, 0, '2023-07-30 03:48:22', '2023-07-31 20:03:32'),
(23, 'Samsung Z Flip 3', 'Samsung Galaxy Z Flip 3', 'http://localhost:8000/static/products/phones/products/samsung-galaxy-z-flip-3.jpg', 'Thiết bị gập của Samsung, nhỏ gọn, mỏng, màn hình tràn viền, hấp dẫn đối với người dùng trẻ', 26990000, 46, 0, 1, 2, 'samsung-galaxy-z-flip-3-nobw022-phone', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(24, 'Samsung S22 Ultra', 'Samsung Galaxy S22 Ultra', 'http://localhost:8000/static/products/phones/products/samsung-galaxy-s22-ultra.jpg', 'Dòng điện thoại hàng đầu của Samsung, thiết kế đẳng cấp, màn hình tràn viền sắc nét, hấp dẫn người dùng trẻ', 30990000, 16, 1, 1, 2, 'samsung-galaxy-s22-ultra-nobw023-phone', 10, 0, '2023-07-30 03:48:22', '2023-07-31 20:03:44'),
(25, 'Samsung S22 Plus', 'Samsung Galaxy S22 Plus', 'http://localhost:8000/static/products/phones/products/samsung-galaxy-s22-plus-5g.jpg', 'Sản phẩm cao cấp của Samsung, thiết kế nhẹ nhàng, màn hình tràn viền đẹp mắt, thu hút người dùng trẻ', 25990000, 15, 0, 1, 2, 'samsung-galaxy-s22-plus-nobw024-phone', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(26, 'Samsung S22', 'Samsung Galaxy S22', 'http://localhost:8000/static/products/phones/products/samsung-galaxy-s22-5g.jpg', 'Sản phẩm tiên tiến của Samsung, thiết bị nhẹ, mỏng, màn hình tràn viền sắc nét, phù hợp với người dùng trẻ', 21990000, 18, 0, 1, 2, 'samsung-galaxy-s22-nobw025-phone', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(27, 'Samsung S21 FE', 'Samsung Galaxy S21 FE', 'http://localhost:8000/static/products/phones/products/samsung-galaxy-s21-fe-5g.jpg', 'Dòng điện thoại phổ thông của Samsung, thiết kế trẻ trung, màn hình tràn viền, thu hút người dùng trẻ', 16990000, 23, 0, 1, 2, 'samsung-galaxy-s21-fe-nobw026-phone', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(28, 'Samsung Note 20 Ultra', 'Samsung Galaxy Note 20 Ultra', 'http://localhost:8000/static/products/phones/products/samsung-galaxy-note-20-ultra-5g.jpg', 'Dòng điện thoại cao cấp của Samsung, thiết kế đẳng cấp, màn hình tràn viền sắc nét, phù hợp với người dùng trẻ', 35990000, 8, 1, 1, 2, 'samsung-galaxy-note-20-ultra-nobw027-phone', 10, 0, '2023-07-30 03:48:22', '2023-07-31 20:04:04'),
(29, 'Samsung A73 5G', 'Samsung Galaxy A73 5G', 'http://localhost:8000/static/products/phones/products/samsung-galaxy-a73-5g.jpg', 'Sản phẩm tiên tiến của Samsung, thiết bị nhẹ nhàng, tích hợp công nghệ 5G, màn hình tràn viền, hấp dẫn với người dùng trẻ', 11990000, 0, 0, 1, 2, 'samsung-galaxy-a73-5g-nobw028-phone', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(30, 'Samsung A53 5G', 'Samsung Galaxy A53 5G', 'http://localhost:8000/static/products/phones/products/samsung-galaxy-a53-5g.jpg', 'Dòng điện thoại phổ thông của Samsung, thiết kế nhẹ, mỏng, tích hợp công nghệ 5G, thu hút người dùng trẻ', 9990000, 0, 0, 1, 2, 'samsung-galaxy-a53-5g-nobw029-phone', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(31, 'Xiaomi 12T Pro 5G', 'Xiaomi 12T Pro 5G', 'http://localhost:8000/static/products/phones/products/xiaomi-12t-pro-5g.jpg', 'Sản phẩm cao cấp của Xiaomi, điện thoại nhẹ, mỏng, tích hợp công nghệ 5G, màn hình tràn viền, hấp dẫn với người dùng trẻ', 16990000, 0, 1, 1, 4, 'xiaomi-12t-pro-5g-nobw030-phone', 10, 0, '2023-07-30 03:48:22', '2023-07-31 20:05:03'),
(32, 'Xiaomi 12T', 'Xiaomi 12T', 'http://localhost:8000/static/products/phones/products/xiaomi-12t.jpg', 'Dòng điện thoại tiên tiến của Xiaomi, thiết kế trẻ trung, màn hình tràn viền đẹp mắt, thu hút sự quan tâm của người dùng trẻ', 12490000, 4, 0, 1, 4, 'xiaomi-12t-nobw031-phone', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(33, 'Xiaomi 12 Pro 5G', 'Xiaomi 12 Pro 5G', 'http://localhost:8000/static/products/phones/products/xiaomi-12-pro-5g.jpg', 'Sản phẩm hàng đầu của Xiaomi, điện thoại nhẹ, mỏng, tích hợp công nghệ 5G, màn hình tràn viền, hấp dẫn đối với người dùng trẻ', 12490000, 7, 0, 1, 4, 'xiaomi-12-pro-5g-nobw032-phone', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(34, 'Xiaomi 12 5G', 'Xiaomi 12 5G', 'http://localhost:8000/static/products/phones/products/xiaomi-12-5g.jpg', 'Sản phẩm cao cấp của Xiaomi, thiết bị nhẹ nhàng, tích hợp công nghệ 5G, màn hình tràn viền sắc nét, phù hợp với người dùng trẻ', 12490000, 7, 0, 1, 4, 'xiaomi-12-5g-nobw033-phone', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(35, 'Xiaomi 11T Pro', 'Xiaomi 11T Pro', 'http://localhost:8000/static/products/phones/products/xiaomi-11t-pro-5g.jpg', 'Dòng điện thoại hàng đầu của Xiaomi, thiết kế trẻ trung, màn hình tràn viền, hấp dẫn người dùng trẻ', 14990000, 12, 0, 1, 4, 'xiaomi-11t-pro-nobw034-phone', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(36, 'Xiaomi 11T', 'Xiaomi 11T', 'http://localhost:8000/static/products/phones/products/xiaomi-11t.jpg', 'Sản phẩm tiên tiến của Xiaomi, điện thoại mỏng gọn, màn hình tràn viền, thu hút người dùng trẻ', 11990000, 15, 0, 1, 4, 'xiaomi-11t-nobw035-phone', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(37, 'Xiaomi 11 Lite', 'Xiaomi 11 Lite', 'http://localhost:8000/static/products/phones/products/xiaomi-11-lite-5g.jpg', 'Dòng điện thoại phổ thông của Xiaomi, thiết kế nhẹ, mỏng, màn hình tràn viền, thu hút người dùng trẻ', 9490000, 10, 0, 1, 4, 'xiaomi-11-lite-nobw036-phone', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(38, 'Macbook Air M1 2020', 'Apple Macbook Air M1 2020', 'http://localhost:8000/static/products/laptops/apple-macbook-air-m1-2020.jpg', 'Macbook mỏng nhẹ, sử dụng chip M1 đột phá', 22990000, 5, 1, 2, 1, 'apple-macbook-air-m1-2020-nobw00-phone', 10, 0, '2023-07-30 03:48:22', '2023-07-31 20:10:23'),
(39, 'Macbook Air M2 2022', 'Apple Macbook Air M2 2022', 'http://localhost:8000/static/products/laptops/apple-macbook-air-m2-2022.jpg', 'Macbook Air tiên tiến với hiệu suất nhanh hơn', 32990000, 0, 0, 2, 1, 'apple-macbook-air-m2-2022-nobw01-phone', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(40, 'Macbook Pro 13 M2 2022', 'Apple Macbook Pro 13 M2 2022', 'http://localhost:8000/static/products/laptops/apple-macbook-pro-13-inch-m2-2022.jpg', 'Phiên bản nâng cấp với thiết kế nhẹ nhàng, hiệu suất ổn định và màn hình sắc nét, mang lại trải nghiệm tuyệt vời cho người dùng', 35990000, 13, 1, 2, 1, 'apple-macbook-pro-13-m2-2022-nobw02-laptop', 10, 0, '2023-07-30 03:48:22', '2023-07-31 20:10:48'),
(41, 'Macbook Pro 14 M1 Max', 'Apple Macbook Pro 14 M1 Max 2021', 'http://localhost:8000/static/products/laptops/apple-macbook-pro-14-m1-max-2021.jpg', 'Sản phẩm cao cấp của Apple, được cải tiến với thiết kế nhẹ nhàng, hiệu suất ổn định, màn hình sắc nét', 86990000, 15, 0, 2, 1, 'apple-macbook-pro-14-m1-max-2021-nobw03-laptop', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(42, 'Macbook Pro 14 M1 Pro', 'Apple Macbook Pro 14 M1 Pro 2021', 'http://localhost:8000/static/products/laptops/apple-macbook-pro-14-m1-pro-2021.jpg', 'Dòng laptop chất lượng của Apple, với thiết kế nhẹ, hiệu suất ổn định và màn hình sắc nét, phù hợp với công việc và giải trí', 65990000, 0, 0, 2, 1, 'apple-macbook-pro-14-m1-pro-2021-nobw04-laptop', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(43, 'Macbook Pro 16 M1 Max', 'Apple Macbook Pro 16 M1 Max 2021', 'http://localhost:8000/static/products/laptops/apple-macbook-pro-16-m1-max-2021.jpg', 'Phiên bản đỉnh cao của Apple, mang đến thiết kế nhẹ nhàng, hiệu suất mạnh mẽ và màn hình sắc nét, đáp ứng mọi nhu cầu sáng tạo và công việc', 92990000, 0, 0, 2, 1, 'apple-macbook-pro-16-m1-max-2021-nobw05-laptop', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(44, 'Macbook Pro 16 M1 Pro', 'Apple Macbook Pro 16 M1 Pro 2021', 'http://localhost:8000/static/products/laptops/apple-macbook-pro-16-m1-pro-2021.jpg', 'Sản phẩm nâng cấp từ Apple, với thiết kế nhẹ nhàng, hiệu suất ổn định và màn hình sắc nét, đáp ứng tốt nhu cầu làm việc và giải trí', 39990000, 5, 1, 2, 1, 'apple-macbook-pro-16-m1-pro-2021-nobw06-laptop', 10, 0, '2023-07-30 03:48:22', '2023-07-31 20:10:54'),
(45, 'Macbook Pro M1 2020', 'Apple Macbook Pro M1 2020', 'http://localhost:8000/static/products/laptops/apple-macbook-pro-m1-2020.jpg', 'Laptop đáng chú ý từ Apple, với thiết kế nhẹ nhàng, hiệu suất ổn định và màn hình sắc nét, đáp ứng mọi nhu cầu học tập và công việc', 35990000, 0, 1, 2, 1, 'apple-macbook-pro-m1-2020-nobw07-laptop', 10, 0, '2023-07-30 03:48:22', '2023-07-31 20:10:58'),
(46, 'Macbook Pro M2 2022', 'Apple Macbook Pro M2 2022', 'http://localhost:8000/static/products/laptops/apple-macbook-pro-m2-2022.jpg', 'Phiên bản nâng cấp của dòng laptop Apple, với thiết kế nhẹ, hiệu suất ổn định và màn hình sắc nét, mang lại trải nghiệm mượt mà cho người dùng', 35390000, 0, 0, 2, 1, 'apple-macbook-pro-m2-2022-nobw08-laptop', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(47, 'Asus ROG Flow Z13', 'Asus ROG Flow Z13', 'http://localhost:8000/static/products/laptops/asus-rog-flow-z13.jpg', 'Laptop gaming gập màn hình độc đáo và hiệu suất đỉnh cao', 57990000, 5, 0, 2, 5, 'asus-rog-flow-z13-nobw09-laptop', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(48, 'Asus ROG Trix Scar 15', 'Asus ROG Trix Scar 15', 'http://localhost:8000/static/products/laptops/asus-rog-strix-scar-15-2022.jpg', 'Laptop gaming cao cấp, màn hình tần số làm mới cao và hiệu năng mạnh mẽ', 43490000, 13, 0, 2, 5, 'asus-rog-trix-scar-15-nobw010-laptop', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(49, 'Asus ROG Zephyrus Duo 16', 'Asus ROG Zephyrus Duo 16', 'http://localhost:8000/static/products/laptops/asus-rog-zephyrus-duo-16.jpg', 'Laptop gaming với hai màn hình, cấu hình mạnh mẽ và hiệu năng ổn định', 129490000, 25, 0, 2, 5, 'asus-rog-zephyrus-duo-16-nobw011-laptop', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(50, 'Asus Vivobook Pro 14X', 'Asus Vivobook Pro 14X', 'http://localhost:8000/static/products/laptops/asus-vivobook-pro-14x-n7401.jpg', 'Laptop tầm trung với màn hình lớn và hiệu năng ổn định', 37490000, 30, 1, 2, 5, 'asus-vivobook-pro-14x-nobw012-laptop', 10, 0, '2023-07-30 03:48:22', '2023-07-31 20:11:04'),
(51, 'Asus Zenbook 14', 'Asus Zenbook 14', 'http://localhost:8000/static/products/laptops/asus-zenbook-14-ux25ea.jpg', 'Laptop mỏng nhẹ, màn hình sống động và hiệu suất tốt', 27190000, 18, 0, 2, 5, 'asus-zenbook-14-nobw013-laptop', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(52, 'Asus Zenbook 14X Oled', 'Asus Zenbook 14X Oled Space Edition', 'http://localhost:8000/static/products/laptops/asus-zenbook-14x-oled-space-edition-ux5401.jpg', 'Laptop cao cấp với màn hình OLED tuyệt đẹp và hiệu suất vượt trội', 31990000, 8, 1, 2, 5, 'asus-zenbook-14x-oled-space-edition-nobw014-laptop', 10, 0, '2023-07-30 03:48:22', '2023-07-31 20:11:11'),
(53, 'Asus Zenbook Duo 14', 'Asus Zenbook Duo 14', 'http://localhost:8000/static/products/laptops/asus-zenbook-duo-14.jpg', 'Laptop sáng tạo với hai màn hình và hiệu suất cao', 33990000, 20, 0, 2, 5, 'asus-zenbook-duo-14-nobw015-laptop', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(54, 'Asus Zenbook Flip 13', 'Asus Zenbook Flip 13 Oled', 'http://localhost:8000/static/products/laptops/asus-zenbook-flip-13-oled.jpg', 'Laptop 2 trong 1 mỏng nhẹ, màn hình OLED sắc nét và tính linh hoạt', 26990000, 20, 0, 2, 5, 'asus-zenbook-flip-13-oled-nobw016-laptop', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(55, 'Dell Alienware M15 R6', 'Dell Alienware M15 R6', 'http://localhost:8000/static/products/laptops/dell-alienware-m15-r6.jpg', 'Laptop gaming mỏng nhẹ, hiệu năng ổn định và màn hình chất lượng cao', 66490000, 16, 0, 2, 6, 'dell-alienware-m15-r6-nobw017-laptop', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(56, 'Dell Alienware X15 R2', 'Dell Alienware X15 R2', 'http://localhost:8000/static/products/laptops/dell-alienware-x15-r2.jpg', 'Laptop gaming cao cấp, cấu hình mạnh mẽ và màn hình sống động', 84990000, 9, 0, 2, 6, 'dell-alienware-x15-r2-nobw018-laptop', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(57, 'Dell Latitude 9430', 'Dell Latitude 9430 2 in 1', 'http://localhost:8000/static/products/laptops/dell-latitude-9430-2-in-1.jpg', 'Laptop 2 trong 1 chuyên nghiệp với tính bảo mật cao', 30490000, 10, 0, 2, 6, 'dell-latitude-9430-2-in-1-nobw019-laptop', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(58, 'Dell Precision 570', 'Dell Precision 570', 'http://localhost:8000/static/products/laptops/dell-precision-570.jpg', 'Laptop chuyên dụng cho đồ họa và công việc sáng tạo', 17690000, 13, 0, 2, 6, 'dell-precision-570-nobw020-laptop', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(59, 'Dell XPS 13 Plus 9320', 'Dell XPS 13 Plus 9320', 'http://localhost:8000/static/products/laptops/dell-xps-13-plus-9320.jpg', 'Laptop mỏng nhẹ, màn hình cảm ứng và hiệu suất ấn tượng', 38490000, 18, 0, 2, 6, 'dell-xps-13-plus-9320-nobw021-laptop', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(60, 'Dell XPS 15 9510', 'Dell XPS 15 9510', 'http://localhost:8000/static/products/laptops/dell-xps-15-9510.jpg', 'Laptop cao cấp, màn hình 4K và hiệu năng vượt trội', 39990000, 25, 0, 2, 6, 'dell-xps-15-9510-nobw022-laptop', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(61, 'Dell XPS 15 9520', 'Dell XPS 15 9520', 'http://localhost:8000/static/products/laptops/dell-xps-15-9520.jpg', 'Laptop mỏng nhẹ, hiệu suất ổn định và màn hình sống động', 37990000, 5, 1, 2, 6, 'dell-xps-15-9520-nobw023-laptop', 10, 0, '2023-07-30 03:48:22', '2023-07-31 20:11:36'),
(62, 'Dell XPS 17 9720', 'Dell XPS 17 9720', 'http://localhost:8000/static/products/laptops/dell-xps-9720-17-inch-2022.jpg', 'Sản phẩm đáng chú ý từ Dell, với thiết kế nhẹ nhàng, hiệu suất ổn định và màn hình sắc nét, phù hợp với nhu cầu công việc và giải trí', 47990000, 11, 0, 2, 6, 'dell-xps-17-9720-nobw024-laptop', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(63, 'Lenovo Ideapad Gaming 3', 'Lenovo Ideapad Gaming 3 Gen 7', 'http://localhost:8000/static/products/laptops/lenovo-ideapad-gaming-3i-gen-7.jpg', 'Laptop gaming giá rẻ với hiệu suất tốt', 2230000, 5, 0, 2, 8, 'lenovo-ideapad-gaming-3-gen-7-nobw025-laptop', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(64, 'Lenovo Ideapad Slim 5', 'Lenovo Ideapad Slim 5 Gen 7', 'http://localhost:8000/static/products/laptops/lenovo-ideapad-slim-5i-gen-7.jpg', 'Laptop tầm trung mỏng nhẹ, hiệu suất ổn định', 17890000, 23, 1, 2, 8, 'lenovo-ideapad-slim-5-gen-7-nobw026-laptop', 10, 0, '2023-07-30 03:48:22', '2023-07-31 20:11:41'),
(65, 'Lenovo Thinkbook 15', 'Lenovo Thinkbook 15 Gen 4', 'http://localhost:8000/static/products/laptops/lenovo-thinkbook-15-gen-4.jpg', 'Laptop doanh nghiệp với hiệu suất mạnh mẽ và tính bảo mật cao', 16890000, 10, 0, 2, 8, 'lenovo-thinkbook-15-gen-4-nobw027-laptop', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(66, 'Lenovo Thinkpad X1 Carbon', 'Lenovo Thinkpad X1 Carbon Gen 10', 'http://localhost:8000/static/products/laptops/lenovo-thinkpad-x1-carbon-gen-10.jpg', 'Laptop doanh nghiệp cao cấp, thiết kế mỏng nhẹ và hiệu suất vượt trội', 25990000, 5, 0, 2, 8, 'lenovo-thinkpad-x1-carbon-gen-10-nobw028-laptop', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(67, 'Thinkpad X1 Extreme', 'Lenovo Thinkpad X1 Extreme Gen 4', 'http://localhost:8000/static/products/laptops/lenovo-thinkpad-x1-extreme-gen-4.jpg', 'Laptop cao cấp với màn hình cảm ứng, hiệu suất mạnh mẽ và tính linh hoạt', 42990000, 5, 0, 2, 8, 'lenovo-thinkpad-x1-extreme-gen-4-nobw029-laptop', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(68, 'Lenovo Thinkpad X1 Nano', 'Lenovo Thinkpad X1 Nano Gen 2', 'http://localhost:8000/static/products/laptops/lenovo-thinkpad-x1-nano-gen-2.jpg', 'Laptop siêu nhẹ và mỏng, đạt tiêu chuẩn quân đội về bền bỉ và hiệu suất cao', 39990000, 5, 0, 2, 8, 'lenovo-thinkpad-x1-nano-gen-2-nobw030-laptop', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(69, 'Lenovo Thinkpad Z16', 'Lenovo Thinkpad Z16', 'http://localhost:8000/static/products/laptops/lenovo-thinkpad-z16.jpg', 'Laptop công nghệ cao, mạnh mẽ với hiệu năng vượt trội và màn hình sống động', 59990000, 5, 0, 2, 8, 'lenovo-thinkpad-z16-nobw031-laptop', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(70, 'LG Gram 14 2022', 'LG Gram 14 2022', 'http://localhost:8000/static/products/laptops/lg-gram-14-2022.jpg', 'Laptop 14 inch siêu nhẹ, pin trâu và hiệu suất ổn định, lý tưởng cho di chuyển', 22990000, 5, 1, 2, 7, 'lg-gram-14-2022-nobw032-laptop', 10, 0, '2023-07-30 03:48:22', '2023-07-31 20:11:57'),
(71, 'IG Gram 16 2022', 'IG Gram 16 2022', 'http://localhost:8000/static/products/laptops/lg-gram-16-2022.jpg', 'Laptop 16 inch mỏng nhẹ, hiệu năng mạnh mẽ và màn hình rộng lớn', 22290000, 5, 0, 2, 7, 'ig-gram-16-2022-nobw033-laptop', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(72, 'LG Gram 17 2021', 'LG Gram 17 2021', 'http://localhost:8000/static/products/laptops/lg-gram-17-2021.jpg', 'Laptop 17 inch siêu nhẹ, màn hình sống động và pin lâu dài', 32990000, 5, 1, 2, 7, 'lg-gram-17-2021-nobw034-laptop', 10, 0, '2023-07-30 03:48:22', '2023-07-31 20:12:13'),
(73, 'LG Gram 17 2022', 'LG Gram 17 2022', 'http://localhost:8000/static/products/laptops/lg-gram-17-2022.jpg', 'Phiên bản nâng cấp với thiết kế nhẹ nhàng, hiệu suất ổn định và màn hình sắc nét', 32990000, 5, 0, 2, 7, 'lg-gram-17-2022-nobw035-laptop', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(74, 'iPad Pro M2 WiFi Cellular', 'iPad Pro M2 WiFi Cellular', '', 'Máy tính bảng tuyệt đẹp, cấu hình mạnh mẽ hoàn hảo, hỗ trợ kết nối WiFi, phù hợp với người dùng phổ thông.', 25090000, 0, 0, 4, 1, 'ipad-pro-m2-wifi-cellular-nobw00-ipad', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(75, 'iPad Pro M1 WiFi Cellular', 'iPad Pro M1 WiFi Cellular', '', 'Máy tính bảng hàng đầu, thiết kế đẹp mắt, hiệu suất mạnh mẽ, hỗ trợ kết nối WiFi và Cellular, đáp ứng mọi nhu cầu sử dụng.', 63990000, 0, 0, 4, 1, 'ipad-pro-m1-wifi-cellular-nobw01-ipad', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(76, 'iPad Pro M1 WiFi', 'iPad Pro M1 WiFi', '', 'Máy tính bảng cao cấp, thiết kế đẹp mắt, cấu hình mạnh mẽ, hỗ trợ kết nối WiFi, phù hợp với người dùng phổ thông.', 38990000, 0, 0, 4, 1, 'ipad-pro-m1-wifi-nobw02-ipad', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(77, 'iPad 10 WiFi', 'iPad 10 WiFi', '', 'Máy tính bảng 10 inch, thiết kế đẹp mắt, hỗ trợ kết nối WiFi, mang lại trải nghiệm tuyệt vời cho người dùng phổ thông.', 15390000, 0, 1, 4, 1, 'ipad-10-wifi-nobw03-ipad', 10, 0, '2023-07-30 03:48:22', '2023-07-31 20:12:30'),
(78, 'iPad 10 WiFi Cellular', 'iPad 10 WiFi Cellular', '', 'Máy tính bảng 10 inch, cấu hình mạnh mẽ, hỗ trợ kết nối WiFi và Cellular, phù hợp với nhu cầu công việc và giải trí.', 15390000, 0, 1, 4, 1, 'ipad-10-wifi-cellular-nobw04-ipad', 10, 0, '2023-07-30 03:48:22', '2023-07-31 20:12:34'),
(79, 'iPad 9 WiFi Cellular', 'iPad 9 WiFi Cellular', '', 'Máy tính bảng thiết kế đẹp mắt, hỗ trợ kết nối WiFi và Cellular, dễ dàng sử dụng cho người dùng phổ thông.', 18490000, 0, 1, 4, 1, 'ipad-9-wifi-cellular-nobw05-ipad', 10, 0, '2023-07-30 03:48:22', '2023-07-31 20:12:37'),
(80, 'iPad 9 WiFi', 'iPad 9 WiFi', '', 'Máy tính bảng thiết kế đẹp mắt, hỗ trợ kết nối WiFi, phù hợp với người dùng phổ thông.', 12290000, 0, 0, 4, 1, 'ipad-9-wifi-nobw06-ipad', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(81, 'iPad Air 5 M1 Wifi Cellular', 'iPad Air 5 M1 Wifi Cellular', '', 'Máy tính bảng Air cao cấp, thiết kế đẹp mắt, hiệu suất mạnh mẽ, hỗ trợ kết nối WiFi và Cellular, đáp ứng mọi nhu cầu sử dụng.', 23390000, 0, 0, 4, 1, 'ipad-air-5-m1-wifi-cellular-nobw07-ipad', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(82, 'iPad Air 5 M1 Wifi', 'iPad Air 5 M1 Wifi', '', 'Máy tính bảng Air cao cấp, thiết kế đẹp mắt, hiệu suất mạnh mẽ, hỗ trợ kết nối WiFi, phù hợp với người dùng phổ thông.', 15590000, 0, 0, 4, 1, 'ipad-air-5-m1-wifi-nobw08-ipad', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(83, 'Samsung Tab S8 Ultra', 'Samsung Galaxy Tab S8 Ultra 5G', '', 'Máy tính bảng cao cấp, hỗ trợ 5G, màn hình chất lượng cao và hiệu suất mạnh mẽ.', 30990000, 0, 1, 3, 2, 'samsung-galaxy-tab-s8-ultra-5g-nobw00-tablet', 10, 0, '2023-07-30 03:48:22', '2023-07-31 20:12:56'),
(84, 'Samsung Tab S7 FE', 'Samsung Galaxy Tab S7 FE 4G', '', 'Máy tính bảng nhỏ gọn, màn hình sắc nét, tích hợp tính năng giải trí tốt, đáp ứng nhu cầu đa phương tiện.', 13990000, 0, 1, 3, 2, 'samsung-galaxy-tab-s7-fe-4g-nobw01-tablet', 10, 0, '2023-07-30 03:48:22', '2023-07-31 20:12:59'),
(85, 'Samsung Tab A8', 'Samsung Galaxy Tab A8', '', 'Máy tính bảng đa năng, thiết kế nhỏ gọn, màn hình sắc nét, hỗ trợ tính năng giải trí đa dạng cho người dùng.', 6990000, 0, 0, 3, 2, 'samsung-galaxy-tab-a8-nobw02-tablet', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(86, 'Samsung Tab A7 Lite', 'Samsung Galaxy Tab A7 Lite', '', 'Thiết kế nhỏ gọn, màn hình sắc nét và tích hợp tính năng giải trí tốt.', 4490000, 0, 0, 3, 2, 'samsung-galaxy-tab-a7-lite-nobw03-tablet', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(87, 'Xiaomi Redmi Pad', 'Xiaomi Redmi Pad', '', ' Máy tính bảng Xiaomi, thiết kế nhỏ gọn, màn hình sắc nét, tích hợp tính năng giải trí tốt, phù hợp với người dùng trẻ.', 6990000, 0, 1, 3, 4, 'xiaomi-redmi-pad-nobw04-tablet', 10, 0, '2023-07-30 03:48:22', '2023-07-31 20:13:03'),
(88, 'OPPO Pad Air', 'OPPO Pad Air', '', 'Máy tính bảng mỏng nhẹ, cấu hình mạnh mẽ phù hợp cho giải trí.', 7990000, 0, 0, 3, 3, 'oppo-pad-air-nobw05-tablet', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22'),
(89, 'Lenovo Yoga Tab 11', 'Lenovo Yoga Tab 11', '', 'Máy tính bảng đa dạng, màn hình xoay 360 độ và hiệu suất ổn định.', 10990000, 0, 0, 3, 8, 'lenovo-yoga-tab-11-nobw06-tablet', 10, 0, '2023-07-30 03:48:22', '2023-07-30 17:48:22');

-- --------------------------------------------------------

--
-- Table structure for table `product_detail`
--

CREATE TABLE `product_detail` (
  `id` int NOT NULL,
  `product_id` int DEFAULT NULL,
  `screen` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `os` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `camera_rear` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `camera_front` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `cpu` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `gpu` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ram` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `storage` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `connector` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `design` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `dimensions_weight` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `sim` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `battery` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `charge` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `posts` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_detail`
--

INSERT INTO `product_detail` (`id`, `product_id`, `screen`, `os`, `camera_rear`, `camera_front`, `cpu`, `gpu`, `ram`, `storage`, `connector`, `design`, `dimensions_weight`, `sim`, `battery`, `charge`, `posts`) VALUES
(1, 1, 'OLED, 6.7 inch, Super Retina XDR 123', 'IOS 16 123', 'Chính 48 MP & Phụ 12 MP, 12 MP 123', '12MP 123', 'Apple A16 Bionic', '', '6GB 123', '512GB 123', '', '', '', '1 Nano SIM & 1 eSIM, Hỗ trợ 5G', '4323 mAh', '20 W', ''),
(2, 2, 'OLED, 6.7 inch, Super Retina XDR 123', 'IOS 16 123', 'Chính 48 MP & Phụ 12 MP, 12 MP 123', '12MP 123', 'Apple A16 Bionic', '', '6GB 123', '512GB 123', '', '', '', '1 Nano SIM & 1 eSIM, Hỗ trợ 5G', '3200 mAh', '20 W', ''),
(3, 3, 'OLED, 6.7 inch, Super Retina XDR', 'IOS 16', 'Chính 12 MP & Phụ 12 MP', '12 MP', 'Apple A15 Bionic', '', '6 GB', '128 GB', '', '', '', '1 Nano SIM & 1 eSIM, Hỗ trợ 5G', '4325 mAh', '20 W', ''),
(4, 4, 'OLED, 6.1 inch, Super Retina XDR', 'IOS 16', 'Chính 12 MP & Phụ 12 MP', '12 MP', 'Apple A15 Bionic', '', '6 GB', '256 GB', '', '', '', '1 Nano SIM & 1 eSIM, Hỗ trợ 5G', '3279 mAh', '20 W', ''),
(5, 5, 'OLED, 6.7 inch, Super Retina XDR', 'IOS 15', 'Chính 12 MP & Phụ 12 MP, 12MP', '12 MP', 'Apple A15 Bionic', '', '6 GB', '256 GB', '', '', '', '1 Nano SIM & 1 eSIM, Hỗ trợ 5G', '4352 mAh', '20 W', ''),
(6, 6, 'OLED, 6.1 inch, Super Retina XDR', 'IOS 15', 'Chính 12 MP & Phụ 12 MP, 12MP', '12 MP', 'Apple A15 Bionic', '', '6 GB', '1 T', '', '', '', '1 Nano SIM & 1 eSIM, Hỗ trợ 5G', '3095 mAh', '20 W', ''),
(7, 7, 'OLED, 5.4 inch, Super Retina XDR', 'IOS 15', 'Chính 12 MP & Phụ 12MP', '12 MP', 'Apple A15 Bionic', '', '4 GB', '128 GB', '', '', '', '1 Nano SIM & 1 eSIM, Hỗ trợ 5G', '2438 mAh', '20 W', ''),
(8, 8, 'OLED, 6.1 inch, Super Retina XDR', 'IOS 15', 'Chính 12 MP & Phụ 12MP', '12 MP', 'Apple A15 Bionic', '', '4 GB', '512 GB', '', '', '', '1 Nano SIM & 1 eSIM, Hỗ trợ 5G', '3240 mAh', '20 W', ''),
(9, 9, 'OLED, 5.4 inch, Super Retina XDR', 'IOS 15', 'Chính 12 MP & Phụ 12MP', '12 MP', 'Apple A14 Bionic', '', '4 GB', '64 GB', '', '', '', '1 Nano SIM & 1 eSIM, Hỗ trợ 5G', '2227 mAh', '20 W', ''),
(10, 10, 'OLED, 6.1 inch, Super Retina XDR', 'IOS 15', 'Chính 12 MP & Phụ 12MP', '12 MP', 'Apple A14 Bionic', '', '4 GB', '128 GB', '', '', '', '1 Nano SIM & 1 eSIM, Hỗ trợ 5G', '2815 mAh', '20 W', ''),
(11, 11, 'IPS LCD, 6.1 inch, Liquid Retina', 'iOS 15', 'Chính 12 MP & Phụ 12MP', '12 MP', 'Apple A13 Bionic', '', '4 GB', '64 GB', '', '', '', '1 Nano SIM & 1 eSIM, Hỗ trợ 4G', '3110 mAh', '18 W', ''),
(12, 12, 'AMOLED, 6.43 inch, Full HD+', 'Android 12', 'Chính 64 MP & Phụ 2 MP, 2 MP', '16 MP', 'Snapdragon 695 5G 8 nhân', '', '8 GB', '256 GB', '', '', '', '2 Nano SIM, Hỗ trợ 5G', '4500 mAh', '33 W', ''),
(13, 13, 'AMOLED, 6.43 inch, Full HD+', 'Android 12', 'Chính 50 MP & Phụ 8 MP, 2 MP', '32 MP', 'MediaTek Dimensity 1300', '', '8 GB', '256 GB', '', '', '', '2 Nano SIMHỗ trợ 5G', '4500 mAh', '80 W', ''),
(14, 14, 'AMOLED, 6.4 inch, Full HD+', 'Android 12', 'Chính 64 MP & Phụ 2 MP, 2 MP', '32 MP', 'Snapdragon 680', '', '8 GB', '256 GB', '', '', '', '2 Nano SIMHỗ trợ 4G', '4500 mAh', '33 W', ''),
(15, 15, 'AMOLED, 6.43 inch, Full HD+', 'Android 11', 'Chính 64 MP & Phụ 2 MP, 2 MP', '16 MP', 'Snapdragon 695 5G', '', '8 GB', '128 GB', '', '', '', '2 Nano SIM (SIM 2 chung khe thẻ nhớ)Hỗ trợ 5G', '4500 mAh', '33 W', ''),
(16, 16, 'AMOLED, 6.5 inch, Full HD+', 'Android 11', 'Chính 50 MP & Phụ 8 MP, 2 MP', '32 MP', 'MediaTek Dimensity 1200 Max', '', '12 GB', '256 GB', '', '', '', '2 Nano SIM, Hỗ trợ 5G', '4500 mAh', '65 W', ''),
(17, 17, 'AMOLED, 6.43 inch, Full HD+', 'Android 12', 'Chính 64 MP & Phụ 2 MP, 2 MP', '32 MP', 'Snapdragon 680', '', '8 GB', '128 GB', '', '', '', '2 Nano SIM, Hỗ trợ 4G', '4500 mAh', '33 W', ''),
(18, 18, 'AMOLED, 6.55 inch, Full HD+', 'Android 11', 'Chính 50 MP & Phụ 16 MP, 13 MP, 2 MP', '32 MP', 'Snapdragon 870 5G', '', '12 GB', '256 GB', '', '', '', '2 Nano SIM', '4500 mAh', '65 W', ''),
(19, 19, 'AMOLED, 6.43 inch, Full HD+', 'Android 11', 'Chính 64 MP & Phụ 8 MP, 2 MP', '32 MP', 'MediaTek Dimensity 900', '', '8 GB', '128 GB', '', '', '', '2 Nano SIM', '4300 mAh', '65 W', ''),
(20, 20, 'Dynamic AMOLED 2X, Chính 7.6 inch & Phụ 6.2 inch, Quad HD+ (2K+)', 'Android 12', 'Chính 50 MP & Phụ 12 MP, 10 MP', '10 MP & 4 MP', 'Snapdragon 8+ Gen 1', '', '12 GB', '256 GB', '', '', '', '1 Nano SIM & 1 eSIM', '4400 mAh', '25 W', ''),
(21, 21, 'Dynamic AMOLED 2X, Chính 7.6 inch & Phụ 6.2 inch, Full HD+', 'Android 11', '3 camera 12 MP', '10 MP & 4 MP', 'Snapdragon 888', '', '12 GB', '256 GB', '', '', '', '2 Nano SIM hoặc 1 Nano SIM + 1 eSIM', '4400 mAh', '25 W', ''),
(22, 22, 'Chính: Dynamic AMOLED 2X, Phụ: Super AMOLED, Chính 6.7 inch & Phụ 1.9, Full HD+', 'Android 12', '2 camera 12 MP', '10 MP', 'Snapdragon 8+ Gen 1', '', '8 GB', '256 GB', '', '', '', '1 Nano SIM & 1 eSIM', '3700 mAh', '25 W', ''),
(23, 23, 'Dynamic AMOLED 2X, Chính 6.7 inch & Phụ 1.9 inch, Full HD+', 'Android 11', '2 camera 12 MP', '10 MP', 'Snapdragon 888', '', '8 GB', '256 GB', '', '', '', '1 Nano SIM & 1 eSIM', '3300 mAh', '15 W', ''),
(24, 24, 'Dynamic AMOLED 2X 6.8 inch Quad HD+ (2K+)', 'Android 12', 'Chính 108 MP & Phụ 12 MP, 10 MP, 10 MP', '40 MP', 'Snapdragon 8 Gen 1', '', '8 GB', '128 GB', '', '', '', '2 Nano SIM hoặc 1 Nano SIM + 1 eSIM', '5000 mAh', '45 W', ''),
(25, 25, 'Dynamic AMOLED 2X, 6.6 inch, Full HD+', 'Android 12', 'Chính 50 MP & Phụ 12 MP, 10 MP', '10 MP', 'Snapdragon 8 Gen 1', '', '8 GB', '128 GB', '', '', '', '2 Nano SIM hoặc 1 Nano SIM + 1 eSIM', '4500 mAh', '45 W', ''),
(26, 26, 'Dynamic AMOLED 2X, 6.1 inch, Full HD+', 'Android 12', 'Chính 50 MP & Phụ 12MP', '10 MP', 'Snapdragon 8 Gen 1', '', '8 GB', '128 GB', '', '', '', '2 Nano SIM hoặc 1 Nano + 1 eSIM', '3700 mAh', '25 W', ''),
(27, 27, 'Dynamic AMOLED 2X, 6.4 inch, Full HD+', 'Android 12', 'Chính 12 MP & Phụ 12 MP, 8 MP', '32 MP', 'Exynos 2100', '', '8 GB', '128 GB', '', '', '', '2 Nano SIM', '4500 mAh', '25 W', ''),
(28, 28, 'Dynamic AMOLED 2X, 6.9 inch, Quad HD+ (2K+)', 'Android 10', 'Chính 108 MP & Phụ 12 MP, 12 MP, cảm biến Laser AF', '10 MP', 'Exynos 990', '', '8 GB', '256 GB', '', '', '', '2 Nano SIM hoặc 1 Nano SIM + 1 eSIMHỗ trợ 4G', '4500 mAh', '25 W', ''),
(29, 29, 'Super AMOLED Plus, 6.7 inch, Full HD+', 'Android 12', 'Chính 108 MP & Phụ 12 MP, 5 MP, 5 MP', '32 MP', 'Snapdragon 778G 5G', '', '8 GB', '128 GB', '', '', '', '2 Nano SIM (SIM 2 chung khe thẻ nhớ)Hỗ trợ 5G', '5000 mAh', '25 W', ''),
(30, 30, 'Super AMOLED, 6.5 inch, Full HD+', 'Android 12', 'Chính 64 MP & Phụ 12 MP, 5 MP, 5 MP', '32 MP', 'Exynos 1280', '', '8 GB', '128 GB', '', '', '', '2 Nano SIM (SIM 2 chung khe thẻ nhớ), Hỗ trợ 5G', '5000 mAh', '25 W', ''),
(31, 31, 'AMOLED, 6.67 inch, 1.5K', 'Android 12', 'Chính 200 MP & Phụ 8 MP, 2 MP', '20 MP', 'Snapdragon 8+ Gen 1', '', '12 GB', '256 GB', '', '', '', '2 Nano SIMHỗ trợ 5G', '5000 mAh', '120 W', ''),
(32, 32, 'AMOLED6, 67 inch, 1.5K', 'Android 12', 'Chính 108 MP & Phụ 8 MP, 2 MP', '20 MP', 'MediaTek Dimensity 8100 Ultra 8 nhân', '', '8 GB', '256 GB', '', '', '', '2 Nano SIM', '5000 mAh', '120 W', ''),
(33, 33, 'AMOLED, 6.73 inch, Quad HD+', 'Android 12', 'Chính 50 MP & Phụ 50 MP, 50 MP', '32 MP', 'Snapdragon 8 Gen 1', '', '12 GB', '256 GB', '', '', '', '2 Nano SIM, Hỗ trợ 5G', '4600 mAh', '120 W', ''),
(34, 34, 'AMOLED, 6.28 inch, Full HD+', 'Android 12', 'Chính 50 MP & Phụ 13 MP, 5 MP', '32 MP', 'Snapdragon 8 Gen 1', '', '8 GB', '256 GB', '', '', '', '2 Nano SIM, Hỗ trợ 5G', '4500 mAh', '67 W', ''),
(35, 35, 'AMOLED, 6.67 inch, Full HD+', 'Android 11', 'Chính 108 MP & Phụ 8 MP, 5 MP', '16 MP', 'Snapdragon 888', '', '12 GB', '256 GB', '', '', '', '2 Nano SIM', '5000 mAh', '120 W', ''),
(36, 36, 'AMOLED, 6.67 inch, Full HD+', 'Android 11', 'Chính 108 MP & Phụ 8 MP, 5 MP', '16 MP', 'MediaTek Dimensity 1200', '', '8 GB', '256 GB', '', '', '', '2 Nano SIM', '5000 mAh', '67 W', ''),
(37, 37, 'AMOLED, 6.55 inch, Full HD+', 'Android 11', 'Chính 64 MP & Phụ 8 MP, 5 MP', '20 MP', 'Snapdragon 778G 5G', '', '8 GB', '128 GB', '', '', '', '2 Nano SIM (SIM 2 chung khe thẻ nhớ)', '4250 mAh', '33 W', ''),
(38, 38, '13.3 inch', 'macOS Big Sur', '', '', 'M1', 'GPU 7 nhân, 16 nhân Neural Engine', '8 GB', '256 GB', '802.11ax Wi-Fi 6 wireless networking', '1.61 cm x 30.41 cm x 21.24 cm', '1.29 kg', '', '', '', ''),
(39, 39, 'Liquid Retina, 13.6 inch', 'MacOS', '', '', 'Apple M2', '8 nhân GPU', '8 GB', '256 GB', '2 x Thunderbolt 3, 1 x Jack tai nghe 3.5 mm, 1 x MagSafe 3', '1,13cm x 30,41cm x 21,5cm', '1.27 kg', '', '', '', ''),
(40, 40, '13 inch', 'MacOS', '', '', 'Apple M2', '10 nhân GPU', '8 GB', '256 GB', 'Cổng sạc, Cổng màn hình, Thunderbolt 3, USB 4, USB 3.1 Gen 2, Cổng 3.5mm', '304.1 mm x 212.4 mm x 15.6 mm', '1.4 kg', '', '', '', ''),
(41, 41, 'Liquid Retina XDR, 14.2 inch', 'MacOS', '', '', 'Apple M1 Max', '32 core-GPU', '32 GB', '1 TB', '3 x Thunderbolt 4 USB-C, 1 x HDMI, 1 x Jack tai nghe 3.5 mm, 1 x SD', '312.6 mm, 221.2 mm, 15.5 mm', '1.6 kg', '', '', '', ''),
(42, 42, 'Liquid Retina, 14.2 inch', 'MacOS', '', '', 'Apple M1 Pro', '16 GPU', '16 GB', '1 TB', '1x Headphone jack, 1x MagSafe port, 1x HDMI, 1x Thunderbolt 4, 1x SDXC', '22.12 cm x 31.26 cm x 1.55 cm', '1.6 kg', '', '', '', ''),
(43, 43, 'Liquid Retina, 16.2 inch', 'MacOS', '', '', 'Apple M1 Max', '32 GPU', '32 GB', '1 TB', '1x Headphone jack, 1x MagSafe port, 1x HDMI, 1x Thunderbolt 4, 1x SDXC', '1.68 x 35.57 x 24.81 cm', '2.1kg', '', '', '', ''),
(44, 44, 'Liquid Retina XDR, 16.2 inch', 'MacOS', '', '', 'Apple M1 Pro', '16 nhân GPU', '16 GB', '512 GB', 'HDMI, Jack tai nghe 3.5 mm, 3 x Thunderbolt 4 USB-C', '355.7 mm x 248.1 mm x 16.8 mm', '2.1 kg', '', '', '', ''),
(45, 45, 'Retina, 13.3 inch', 'MacOS', '', '', 'Apple M1', '8 nhân GPU', '16 GB', '1 TB', 'Jack tai nghe 3.5 mm, 2 x Thunderbolt 3', '304.1 mm x 212.4 mm x 15.6 mm', '1.4 kg', '', '', '', ''),
(46, 46, 'Retina, 13.3 inch', 'MacOS', '', '', 'Apple M2', '10 nhân GPU', '8 GB', '512 GB', 'Jack tai nghe 3.5 mm, 2 x Thunderbolt 3', '304.1 mm x 212.4 mm x 15.6 mm', '1.4 kg', '', '', '', ''),
(47, 47, 'QHD+, 13.4 inch', 'Windows 11', '', '', 'Intel core i9-13900H', 'RTX-4050', '16 GB', '1 TB', 'USB Type-C, Jack tai nghe 3.5 mm, 1x ROG XG Mobile Interface, 1 x USB 3.2, 1 x Thunderbolt 4', '302 mm x 206 mm x 14.2 mm', '1.18 kg', '', '', '', ''),
(48, 48, 'WQHD, 15.6 inch', 'Windows 11', '', '', 'Intel core i7-12700H', 'RTX-3060', '16 GB', '512 GB', '1 x Thunderbolt 4, Jack tai nghe 3.5 mm, 2 x USB 3.2, HDMI, LAN, 1 x USB Type-C 3.2', '354 mm x 259 mm x 27.2 mm', '2.3 kg', '', '', '', ''),
(49, 49, '16 inch', 'Windows 11', '', '', 'AMD Ryzen 9 7945HX', 'RTX-4080', '32 GB', '1 TB', '2x Khe cắm M.2, 2x Khe cắm DDR5 SO-DIMM, 2x PCIe, 1x Cổng LAN 2.5G, 2x USB 3.2 Gen 2 Type-C, 2x USB ', '35.5cm x 26.6cm x 2.05cm', '2.67 kg', '', '', '', ''),
(50, 50, '16 inch', 'Windows 11', '', '', 'AMD Ryzen 9 6900HX', ' RTX-3050', '16 GB', '512 GB', '1x USB 3.2, 1x micro HDMI, 1x DC-in Micro SD card reader, 1x USB 4.0', '36.05cm x 25.90cm x 1.89cm', '2.00 kg', '', '', '', ''),
(51, 51, 'OLED, 14 inch', 'Windows 11', '', '', 'Intel Core i5', 'Intel Iris Xe Graphics', '16 GB', '512 GB', '1 x USB 3.2 Gen 1, 1 x USB 3.2 Gen 2, 2 x Thunderbolt 4, 1 x HDMI, 1 x microSD card reader, 1 x 3.5m', '31.36cm x 22.06cm x 1.69cm', '1.39 kg', '', '', '', ''),
(52, 52, '14 inch', 'Windows 11', '', '', 'Intel Core i7', 'Intel Iris Xe Graphics', '16 GB', '512 GB', '1x USB 3.2 Gen 2 Type-A, 2x Thunderbolt 4, 1x HDMI 2.1 TMDS, 1x 3.5mm, Đầu đọc thẻ Micro SD', '31.36cm x 22.06cm x 1.69cm', '1.39 kg', '', '', '', ''),
(53, 53, '14 inch', 'Windows 10', '', '', 'Intel Core i5-1135G7', 'NVIDIA GeForce MX450', '8 GB', '512 GB', '1 x USB 3.1 Gen 1 Type-A, 2 x USB-C Thunderbolt 4, 1 x HDMI, 1 x Headphone/Microphone combo audio ja', '32.40cm x 22.20cm x 1.69cm', '1.61 kg', '', '', '', ''),
(54, 54, '13.3 inch', 'Windows 10', '', '', 'Intel Core i5-8265U', 'Intel UHD Graphics 620', '8 GB', '256 GB', '1x USB 2.0, 2x USB 3.1 Gen2 Type-C, HDMI', '30.5cm x 19.6cm x 1.69cm', '1.3 kg', '', '', '', ''),
(55, 55, '15.6 inch', 'Windows 10', '', '', 'Intel Core i7-11800H', 'RTX-3070', '32 GB', '1 TB', '1x Type-C, 3x Type-A USB 3.2 Gen 1, 1x HDMI 2.1, 1x RJ-45 Ethernet, 1x jack tai nghe, 1x Power/DC-In', '356.2mm x 272.5mm x 19.2mm', '2.69 kg', '', '', '', ''),
(56, 56, '15.6 inch', 'Windows 11 Pro', '', '', 'Intel core i9-12900H', 'RTX-3070', '16 GB', '1 TB', '1 x Cổng USB 3.2, 1 x Cổng Thunderbolt 4, 1 x Giắc cắm âm thanh đa năng, 1 x Cổng HDMI 2.1', '359.7mm x 277.33mm x 15.9mm', '2.27 kg', '', '', '', ''),
(57, 57, 'QHD+, 1, 14 inch', 'Windows 11', '', '', 'Intel core i7-1265U', ' Intel Iris Xe graphics', '32 GB', '512 GB', '2 x Thunderbolt 4, 1 x USB 3.2 Gen 2, 1 x HDMI 2.0, x microSD card reader', '359.7mm x 277.33mm x 15.9mm', '1.44 kg', '', '', '', ''),
(58, 58, 'WLED, 17 inch', 'Windows 10', '', '', 'Intel core i5-11500H', 'Intel UHD Graphics 11th Gen', '16 GB', '512 GB', '4 x Thunderbolt 4, 1 x Universal Audio Jack, 1 x SD Card reader, 1 x Fingerprint reader', '248.08mm x 374.48mm x 8.67mm', '2.13kg', '', '', '', ''),
(59, 59, 'OLED, 13.4 inch', 'Windows 11', '', '', 'Intel core i7-1260P', 'Intel Iris Xe', '16 GB', '512 GB', '2 x Thunderbolt 4, USB-C', ' 295.3mm x 199mm x 15.28mm', '1.26 kg', '', '', '', ''),
(60, 60, '15.6 inch', 'Windows 11 Pro', '', '', 'Intel core i7-11800H', 'RTX-3050', '16 GB', '512 GB', '1 USB 3.2 Gen 2 Type-C, 1 3.5mm headphone-microphone combo jack ', '35.7cm x 23.5cm x 1.7cm', '1.8 kg', '', '', '', ''),
(61, 61, 'FHD+, 15.6 inch', 'Windows 11', '', '', 'Intel core i7-12700H', 'RTX-3050', '16 GB', '512 GB', '1 USB 3.2 Gen 2 Type-C, 2 Thunderbolt 4, 1 3.5mm headphone-microphone combo jack', '18.54 mm x 344.40 mm x 230.10 mm', '1.96 kg', '', '', '', ''),
(62, 62, 'FHD+, 17.0 inch', 'Windows 11', '', '', 'Intel core i7-12700H', 'RTX-3050', '16 GB', '512 GB', '4 Thunderbolt 4, 1 eDP port with max +3 USB Type-C, 1 Universal audio jack', '374.45 mm x 248.05 mm x 19.5 mm', '2.21kg', '', '', '', ''),
(63, 63, '15.6 inch', 'Windows 11', '', '', 'Intel core i5-12500H', 'RTX-3050', '8 GB', '512 GB', '2x USB 3.2, 1x HDMI 2.0, 1x Ethernet, 1 x giắc cắm kết hợp tai nghe-micro 3.5mm', '359,6mm x 266,4mm x 21,8mm', '2,315 kg', '', '', '', ''),
(64, 64, '14 inch', 'Windows 11', '', '', 'Intel core i5-1135G7', 'Intel Iris Xe Graphics', '8 GB', '256 GB', '1x USB 3.2, 1x USB-C 3.2, 1x HDMI 1.4b, 1x Card reader, 1x Combo mic tai nghe 3.5mm', '321.57mm x 211.59mm x 17.9mm', '1.39 kg', '', '', '', ''),
(65, 65, '15.6 inch', 'Windows 11', '', '', 'Ryzen 7 5825U', 'AMD Radeon Graphics', '8 GB', '512 GB', '1x USB 3.2, 2x USB-C 3.2, 1x HDMI, 1x Đầu đọc thẻ, 1x Ethernet, 1x Headphone-microphone combo jack 3', '357mm x 235mm x 18.9mm', '1.7 kg', '', '', '', ''),
(66, 66, 'WUXGA, 14 inch', 'Windows 11', '', '', 'Intel core i7', 'Intel Iris Xe', '16 GB', '512 GB', 'HDMI, Jack tai nghe 3.5 mm, 1 x USB 3.2, 2 x Thunderbolt 4, 1 x USB 3.2', '315.6 mm - 222.5 mm - 15.36 mm', '1.12 kg', '', '', '', ''),
(67, 67, 'WQUXGA, 16.0 inch', 'Win 11 Pro', '', '', 'Intel core i7-11800H', 'RTX-3060', '16 GB', '512 GB', '2 Type-C, 1 HDMI, 1 Jack 3.5mm, 1 Thunderbolt, 1 khe cắm thẻ nhớ SD', '323.5mm x 217.1mm x 15.95mm', '1.13 kg', '', '', '', ''),
(68, 68, '2k, 13.0 inch', 'Windows 11 Pro', '', '', 'Intel core i7-1260P', 'Intel Iris Xe Graphics', '16 GB', '512 GB', '2 x USB4 Thunderbolt 4, 1 x Headphone-mic combo, 1 x Fingerprint Reader', '292.8mm x 207.7mm x 13.87mm', '0.907 kg', '', '', '', ''),
(69, 69, 'WUXGA, 16.0 inch', 'Windows 11 Pro', '', '', 'Ryzen 7 PRO 6850H', 'AMD Radeon RX 6500M', '16 GB', '1 TB', '2 x cổng USB 4.0, 1 x cổng USB-C 3.2 Gen 2, 1 x jack cắm âm thanh 3.5mm', '354,4mm x 237,4mm x 15,8mm', '1.8 kg', '', '', '', ''),
(70, 70, 'WUXGA, 14.0 inch', 'Windows 11', '', '', 'Intel core i7-1260P', 'Intel Iris Xe Graphics', '16 GB', '512 GB', '1 x cổng HDMI, 2 x cổng USB type C, 2 x cổng USB A 3.2, jack âm thanh 3.5mm, khe thẻ microSD', '16.76mm x 311.91mm x213.8mm', '1 kg', '', '', '', ''),
(71, 71, '16 inch', 'Windows 11', '', '', 'Intel core i5-1240P', 'Intel Iris Xe Graphics', '16 GB', '256 GB', '2 x cổng Thunderbolt 4, 2 x cổng USB, 1 x HDMI, microSD-jack cắm tai nghe 3.5mm', '35.4cm x 24.2cm x 1.7cm', '1.19kg', '', '', '', ''),
(72, 72, '17 inch', '', '', '', 'Intel core i7-1165G7', 'Intel Iris Xe', '32GB', '1 TB', '1 x USB-C, 1 x ack âm thanh 3,5mm, 1 x HDMI 2.0', '14,97inch x 10,24inch x 0,70inch', '1.35kg', '', '', '', ''),
(73, 73, '17 inch', 'Windows 11', '', '', 'Intel core i7-1260P', 'Intel Iris Xe Graphics', '16 GB', '512 GB', '1 x USB-C, jack âm thanh 3,5mm, 1 x HDMI 2.0, khe cắm microSD', '378.8mm x 258.8mm x 17.7mm', '1,435 kg', '', '', '', ''),
(74, 74, 'Liquid Retina, 11 inch, 120 Hz', 'iPadOS 16', 'Chính 12 MP & Phụ 10 MP, TOF 3D LiDAR', '12 MP', 'Apple M2 8 nhân', '', '8 GB', '128 GB', '', '', '', '1 Nano SIM hoặc 1 eSIM', '28.65 Wh (~ 7538 mAh)', '20 W', ''),
(75, 75, 'Liquid Retina XDR, 12.9 inch', 'iPadOS 15', 'Chính 12 MP & Phụ 10 MP, TOF 3D LiDAR', '12 MP', 'Apple M1', '', '16 GB', '2 TB', '', '', '', '1 Nano SIM hoặc 1 eSIM', '40.88 Wh (~ 10.835 mAh)', '20 W', ''),
(76, 76, 'Liquid Retina XDR, 12.9 inch', 'iPadOS 15', 'Chính 12 MP & Phụ 10 MP, TOF 3D LiDAR', '12 MP', 'Apple M1', '', '8 GB', '512 GB', '', '', '', '', '40.88 Wh (~ 10.835 mAh)', '20 W', ''),
(77, 77, 'Retina IPS LCD, 10.9 inch', 'iPadOS 16', '12 MP', '12 MP', 'Apple A14 Bionic', '', '4 GB', '256 GB', '', '', '', '', '28.6 Wh (~ 7587 mAh)', '20 W', ''),
(78, 78, 'Retina IPS LCD, 10.9 inch', 'iPadOS 16', '12 MP', '12 MP', 'Apple A14 Bionic', '', '4 GB', '64 GB', '', '', '', '1 Nano SIM hoặc 1 eSIM', '28.6 Wh (~ 7587 mAh)', '20 W', ''),
(79, 79, 'Retina IPS LCD, 10.2 inch', 'iPadOS 15', '8 MP', '12 MP', 'Apple A13 Bionic', '', '3 GB', '256 GB', '', '', '', '1 Nano SIM & 1 eSIM', '32.4 Wh (~ 8600 mAh)', '20 W', ''),
(80, 80, 'Retina IPS LCD, 10.2 inch', 'iPadOS 15', '8 MP', '12 MP', 'Apple A13 Bionic', '', '3 GB', '256 GB', '', '', '', '', '32.4 Wh (~ 8600 mAh)', '20 W', ''),
(81, 81, 'Retina IPS LCD, 10.9 inch', 'iPadOS 15', '12 MP', '12 MP', 'Apple M1', '', '8 GB', '256 GB', '', '', '', '1 Nano SIM & 1 eSIM', '28.6 Wh (~ 7587 mAh)', '20 W', ''),
(82, 82, 'Retina IPS LCD, 10.9 inch', 'iPadOS 15', '12 MP', '12 MP', 'Apple M1', '', '8 GB', '64 GB', '', '', '', '1 Nano SIM & 1 eSIM', '28.6 Wh (~ 7587 mAh)', '20 W', ''),
(83, 83, 'Super AMOLED, 14.6 inch', 'Android 12', 'Chính 13 MP & Phụ 6 MP', '2 Camera 12 MP', 'Snapdragon 8 Gen 1', '', '8 GB', '128 GB', '', '', '', '1 Nano SIM', '11200 mAh', '45 W', ''),
(84, 84, 'TFT LCD, 12.4 inch', 'Android 11', '8 MP', '5 MP', 'Snapdragon 750G', '', '4 GB', '64 GB', '', '', '', '1 Nano SIM', '10090 mAh', '45 W', ''),
(85, 85, 'TFT LCD, 10.5 inch', 'Android 11', '8 MP', '5 MP', 'UniSOC T618', '', '4 GB', '64 GB', '', '', '', '1 Nano SIM', '7040 mAh', '15 W', ''),
(86, 86, 'TFT LCD, 8.7 inch', 'Android 11', '', '', 'MediaTek MT8768T', '', '3 GB', '32 GB', '', '', '', '1 Nano SIM', '5100 mAh', '15 W', ''),
(87, 87, 'IPS LCD, 10.61 inch', 'Android 12', '8 MP', '8 MP', 'MediaTek Helio G99', '', '4 GB', '128 GB', '', '', '', '', '8000 mAh', '18 W', ''),
(88, 88, 'IPS LCD, 10.36 inch', 'Android 12', '8 MP', '5 MP', 'Snapdragon 680 8 nhân', '', '4 GB', '128 GB', '', '', '', '', '7100 mAh', '18 W', ''),
(89, 89, 'IPS LCD, 11 inch', 'Android 11', '8 MP', '8 MP', 'MediaTek Helio G90T', '', '4 GB', '128 GB', '', '', '', '1 Nano SIM', '7500 mAh', '20 W', '');

-- --------------------------------------------------------

--
-- Table structure for table `ship`
--

CREATE TABLE `ship` (
  `id` int NOT NULL,
  `to_address_id` int DEFAULT NULL,
  `name_from` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `price` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ship`
--

INSERT INTO `ship` (`id`, `to_address_id`, `name_from`, `price`) VALUES
(1, 19, '', 153000),
(2, 1, '', 83000),
(3, 3, '', 830000),
(5, 20, '', 174816),
(6, 20, '', 414032),
(7, 20, '', 50185),
(8, 20, '', 442956),
(9, 20, '', 491317),
(10, 20, '', 76193),
(11, 20, '', 589960),
(12, 20, '', 239046),
(13, 20, '', 291766),
(14, 20, '', 394685),
(15, 20, '', 321229),
(16, 20, '', 210950),
(17, 20, '', 128935),
(18, 19, '', 123253),
(19, 20, '', 219459),
(20, 20, '', 168007),
(21, 20, '', 124677),
(22, 6, '', 110217),
(23, 29, '', 356258);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `id_firebase` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `id_provider` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `firstname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `lastname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `sex` char(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `avatar_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `coin` int DEFAULT NULL,
  `is_delete` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `id_firebase`, `id_provider`, `firstname`, `lastname`, `phone`, `sex`, `birthday`, `email`, `username`, `password`, `avatar_url`, `coin`, `is_delete`, `created_at`, `updated_at`) VALUES
(100537050, '0', '0', 'Mạnh', 'Nguyễn Đức', '0868818614', 'male', '2003-03-16', 'nguyenducmanhsttvu@gmail.com', 'ndm', '123', '', 0, 0, '2023-07-30 09:25:16', '2023-12-18 21:40:18'),
(100537051, '0', '0', 'An', 'Trần Ngọc', '0357866568', 'female', '2002-11-27', 'tranngocan@gmail.com', 'tna', '123', '', 800, 0, '2023-07-30 09:31:03', '2023-07-31 20:48:16'),
(100537052, '0', '0', 'Tiến', 'Lý Nam', '08367461273', 'other', '2005-01-31', 'lynamtien@gmail.com', 'lnt', '123', '', 0, 0, '2023-07-30 09:33:33', '2023-07-31 20:48:26'),
(100537053, '0', '0', 'Nam', 'Nguyễn Thành', '0354897658', 'male', '1987-01-23', 'nguyenthanhnam@gmail.com', 'ntn', '123', 'http://localhost:8000/static/user/nowbuys_user_1.jpg', 12000, 0, '2023-08-02 07:36:22', '2023-10-06 22:08:27'),
(100537054, '0', '0', 'Hương', 'Trần Thị', '0864521495', 'female', '1995-06-02', 'tranthihuong@gmail.com', 'tth', '123', 'http://localhost:8000/static/user/nowbuys_user_2.jpg', 155, 0, '2023-08-02 07:36:22', '2023-10-06 22:08:27'),
(100537055, '0', '0', 'Minh', 'Lê Văn', '0397564255', 'other', '2000-07-30', 'levanminh@gmail.com', 'lvn', '123', 'http://localhost:8000/static/user/nowbuys_user_3.jpg', 1424, 0, '2023-08-02 07:36:22', '2023-10-06 22:08:27'),
(100537056, '0', '0', 'Toàn', 'Nguyễn Văn', '0936451146', 'male', '1999-02-21', 'nguyenvantoan@gmail.com', 'nvt', '123', 'http://localhost:8000/static/user/nowbuys_user_4.jpg', 11320, 0, '2023-08-02 07:36:22', '2023-10-06 22:08:27'),
(100537057, '0', '0', 'Lan', 'Phạm Thị', '0962155346', 'female', '1988-05-17', 'phamthilan@gmail.com', 'ptl', '123', 'http://localhost:8000/static/user/nowbuys_user_5.jpg', 8542, 0, '2023-08-02 07:36:22', '2023-10-06 22:08:27'),
(100537058, '0', '0', 'Hương', 'Nguyễn Thị', '0865245215', 'female', '1992-06-26', 'nguyenthihuong@gmail.com', 'nth', '123', 'http://localhost:8000/static/user/nowbuys_user_6.jpg', 9456, 0, '2023-08-02 07:36:22', '2023-10-06 22:08:27'),
(100537059, '0', '0', 'Tùng', 'Trần Văn', '0865145243', 'male', '1995-11-25', 'tranvantung@hotmail.com', 'tvt', '123', 'http://localhost:8000/static/user/nowbuys_user_7.jpg', 12354, 0, '2023-08-02 07:36:22', '2023-10-06 22:08:27'),
(100537060, '0', '0', 'Minh', 'Trần Đình', '0964214512', 'other', '1986-02-14', 'trandinhminh@gmail.com', 'tdm', '123', 'http://localhost:8000/static/user/nowbuys_user_8.jpg', 15365, 0, '2023-08-02 07:36:22', '2023-10-06 22:10:31'),
(100537061, '0', '0', 'Hậu', 'Lê Văn', '0865245211', 'male', '2001-05-24', 'levanhau@gmail.com', 'lvh', '123', 'http://localhost:8000/static/user/nowbuys_user_9.jpg', 6542, 0, '2023-08-02 07:36:22', '2023-10-06 22:10:31'),
(100537062, '0', '0', 'Phong', 'Lê Hồng', '0982493214', 'male', '1988-02-14', 'lehongphong@gmail.com', 'lhp', '123', 'http://localhost:8000/static/user/nowbuys_user_10.jpg', 6532, 0, '2023-08-02 07:36:22', '2023-10-06 22:10:31'),
(100537063, '0', '0', 'Tâm', 'Trần Thị Thanh', '0365245655', 'female', '1999-09-19', 'tranthithanhtam@gmail.com', 'tttt', '123', 'http://localhost:8000/static/user/nowbuys_user_11.jpg', 2564, 0, '2023-08-02 07:36:22', '2023-10-06 22:10:31'),
(100537064, '0', '0', 'Hoài', 'Nguyễn Thanh', '0365245215', 'male', '1982-03-26', 'nguyenthanhhoai@gmail.com', 'nth', '123', 'http://localhost:8000/static/user/nowbuys_user_12.jpg', 6524, 0, '2023-08-02 07:36:22', '2023-10-06 22:10:31'),
(100537065, '0', '0', 'Anh', 'Trần Thị Lan', '0965224521', 'female', '1986-06-24', 'tranthilananh@gmail.com', 'ttla', '123', 'http://localhost:8000/static/user/nowbuys_user_13.jpg', 5642, 0, '2023-08-02 07:36:22', '2023-10-06 22:10:31'),
(100537066, '0', '0', 'Hà', 'Vũ Thị Thu', '0894251524', 'female', '1995-06-15', 'vuthithuha@gmail.com', 'vtth', '123', 'http://localhost:8000/static/user/nowbuys_user_14.jpg', 564, 0, '2023-08-02 07:36:22', '2023-10-06 22:10:31'),
(100537067, '0', '0', 'Dũng', 'Trần Minh', '0835465254', 'male', '2000-08-15', 'tranminhdung@gmail.com', 'tmd', '123', 'http://localhost:8000/static/user/nowbuys_user_15.jpg', 6542, 0, '2023-08-02 07:36:22', '2023-10-06 22:11:38'),
(100537068, '0', '0', 'Hoa', 'Lê Thị', '0856428315', 'female', '1996-11-26', 'lethihoa@gmail.com', 'lth', '123', 'http://localhost:8000/static/user/nowbuys_user_16.jpg', 0, 0, '2023-08-02 07:36:22', '2023-10-06 22:11:38'),
(100537069, '0', '0', 'Hải', 'Nguyễn Văn', '0965248314', 'male', '1998-06-15', 'nguyenvanhai@gmail.com', 'nvh', '123', 'http://localhost:8000/static/user/nowbuys_user_17.jpg', 5364, 0, '2023-08-02 07:36:22', '2023-10-06 22:11:38'),
(100537070, '0', '0', 'Liên', 'Nguyễn Thị Kim', '0965413254', 'female', '1989-08-24', 'nguyenthikimlien@gmail.com', 'ntkl', '123', 'http://localhost:8000/static/user/nowbuys_user_18.jpg', 564, 0, '2023-08-02 07:36:22', '2023-10-06 22:11:38'),
(100537071, '0', '0', 'Tâm', 'Phạm Minh', '0964035152', 'male', '1985-07-28', 'phamminhtam@gmail.com', 'pmt', '123', 'http://localhost:8000/static/user/nowbuys_user_19.jpg', 6504, 0, '2023-08-02 07:36:22', '2023-10-06 22:11:38'),
(100537072, '0', '0', 'Lâm', 'Đỗ Văn', '0965243516', 'male', '2001-08-27', '@gmail.com', 'dvl', '123', 'http://localhost:8000/static/user/nowbuys_user_20.jpg', 644, 0, '2023-08-02 07:36:22', '2023-10-06 22:11:38'),
(100537073, '0', '0', 'Hùng', 'Nguyễn Văn', '0865214523', 'male', '1986-09-18', 'nguyenvanhung@gmail.com', 'nvh', '123', 'http://localhost:8000/static/user/nowbuys_user_21.jpg', 6414, 0, '2023-08-02 07:36:22', '2023-10-06 22:11:38'),
(100537074, '0', '0', 'Nga', 'Trần Thị', '0865213524', 'female', '1985-06-24', 'tranthinga@gmail.com', 'ttn', '123', 'http://localhost:8000/static/user/nowbuys_user_22.jpg', 6524, 0, '2023-08-02 07:36:22', '2023-10-06 22:12:34'),
(100537075, '0', '0', 'Hương', 'Lê Thị', '0912345678', 'female', '1986-06-21', 'lethihuong@gmail.com', 'lth', '123', 'http://localhost:8000/static/user/nowbuys_user_23.jpg', 6524, 0, '2023-08-02 07:36:22', '2023-10-06 22:12:34'),
(100537076, '0', '0', 'Thịnh', 'Phạm Đức', '0987654321', 'male', '1985-10-26', 'phamducthinh@gmail.com', 'pdt', '123', 'http://localhost:8000/static/user/nowbuys_user_24.jpg', 6514, 0, '2023-08-02 07:36:22', '2023-10-06 22:12:34'),
(100537077, '0', '0', 'Bình', 'Nguyễn Thanh', '0369852147', 'male', '1992-06-15', 'nguyenthanhbinh@gmail.com', 'ntb', '123', 'http://localhost:8000/static/user/nowbuys_user_25.jpg', 6445, 0, '2023-08-02 07:36:22', '2023-10-06 22:12:34'),
(100537078, '0', '0', 'Hương', 'Lê Thị Thu', '0856749231', 'female', '1995-06-24', 'lethithuhuong@gmail.com', 'ltth', '123', 'http://localhost:8000/static/user/nowbuys_user_26.jpg', 652, 0, '2023-08-02 07:36:22', '2023-10-06 22:12:34'),
(100537079, '0', '0', 'Tài', 'Phạm Văn', '0321564879', 'male', '1999-02-21', 'phamvantai@gmail.com', 'pvt', '123', 'http://localhost:8000/static/user/nowbuys_user_27.jpg', 647, 0, '2023-08-02 07:36:22', '2023-10-06 22:12:34'),
(100537080, '0', '0', 'Thắng', 'Trần Văn', '0965478921', 'male', '1996-06-24', 'tranvanthang@gmail.com', 'tvt', '123', 'http://localhost:8000/static/user/nowbuys_user_28.jpg', 5144, 0, '2023-08-02 07:36:22', '2023-10-06 22:12:34'),
(100537081, '0', '0', 'Hạnh', 'Nguyễn Thị Hồng', '0887654321', 'female', '1982-08-20', 'nguyenthihonghanh@gmail.com', '', '123', 'http://localhost:8000/static/user/nowbuys_user_29.jpg', 6524, 0, '2023-08-02 07:36:22', '2023-10-06 22:13:06'),
(100537082, '0', '0', 'Phương', 'Nguyễn Văn', '0358742961', 'male', '2000-06-29', 'nguyenvanphuong@gmail.com', 'nvp', '123', 'http://localhost:8000/static/user/nowbuys_user_30.jpg', 651, 0, '2023-08-02 07:36:22', '2023-10-06 22:13:06'),
(100537083, '0', '0', 'Nhung', 'Nguyễn Thị Hồng', '0945367821', 'female', '1986-05-15', 'nguyenthihongnhung@gmail.com', 'nthn', '123', 'http://localhost:8000/static/user/nowbuys_user_31.jpg', 652, 0, '2023-08-02 07:36:22', '2023-10-06 22:13:06'),
(100537084, '0', '0', 'An', 'Lê Minh', '0779823641', 'male', '2002-06-21', 'leminhan@gmail.com', 'lma', '123', 'http://localhost:8000/static/user/nowbuys_user_32.jpg', 654, 0, '2023-08-02 07:36:22', '2023-10-06 22:13:06'),
(100537085, '0', '0', 'Đức', 'Phan Anh', '0832147659', 'male', '0000-00-00', 'phananhduc@gmail.com', 'pad', '123', 'http://localhost:8000/static/user/nowbuys_user_33.jpg', 6524, 0, '2023-08-02 07:36:22', '2023-10-06 22:13:06'),
(100537086, '0', '0', 'Hiếu', 'Trần Văn', '0946552423', 'male', '2001-09-12', 'tranvanhieu@gmail.com', 'tvh', '123', 'http://localhost:8000/static/user/nowbuys_user_34.jpg', 9312, 0, '2023-08-02 07:36:22', '2023-10-06 22:13:06'),
(100537104, 'ekraq6t4ZfYliFTWwDbXoYLN2AQ2', '111999810207318313807', 'Nguyễn Đức Mạnh', '', '', 'other', '2000-01-01', 'nguyenducndm2@gmail.com', '', '', 'https://lh3.googleusercontent.com/a/ACg8ocI3D4gzCJC4OuP7MmQrKW5CNL6Ow5izIFvaxXu6tHhEOeI=s96-c', 0, 0, '2023-10-12 10:04:13', '2023-10-12 17:04:13'),
(100537105, '2l3bvkY19HXfWJqZJYBg7n6Dz1c2', '100945409455960173659', 'Mạnh Nguyễn Đức', '', '', 'other', '2000-01-01', 'nguyenducmanhsttvu@gmail.com', '', '', 'https://lh3.googleusercontent.com/a/ACg8ocKeMORbXFPKhndfalpok5qH24nMmI0ywc10tmRXUsCEIw=s96-c', 0, 0, '2023-12-10 08:50:08', '2023-12-10 15:50:08');

-- --------------------------------------------------------

--
-- Table structure for table `voucher`
--

CREATE TABLE `voucher` (
  `id` int NOT NULL,
  `code` char(20) NOT NULL,
  `for_discount` enum('ship','product') NOT NULL DEFAULT 'ship',
  `start` datetime NOT NULL,
  `expired` datetime NOT NULL,
  `percent` int NOT NULL,
  `price_voucher_max` int NOT NULL,
  `order_price_min` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `voucher`
--

INSERT INTO `voucher` (`id`, `code`, `for_discount`, `start`, `expired`, `percent`, `price_voucher_max`, `order_price_min`) VALUES
(1, 'abc', 'product', '2023-07-30 16:25:16', '2023-12-30 16:25:16', 5, 9000000, 100000),
(2, '123', 'ship', '2023-10-30 23:59:59', '2023-12-30 23:59:59', 30, 300000, 200000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `brand_catelogy`
--
ALTER TABLE `brand_catelogy`
  ADD PRIMARY KEY (`id`),
  ADD KEY `brand_id` (`brand_id`),
  ADD KEY `catelogy_id` (`catelogy_id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id_2` (`user_id`,`product_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `catelogy`
--
ALTER TABLE `catelogy`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `ship_id` (`ship_id`),
  ADD KEY `voucher_id` (`voucher_id`);

--
-- Indexes for table `order_products`
--
ALTER TABLE `order_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `otp`
--
ALTER TABLE `otp`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `catelogy_id` (`catelogy_id`),
  ADD KEY `brand_id` (`brand_id`);

--
-- Indexes for table `product_detail`
--
ALTER TABLE `product_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `ship`
--
ALTER TABLE `ship`
  ADD PRIMARY KEY (`id`),
  ADD KEY `to_address_id` (`to_address_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `voucher`
--
ALTER TABLE `voucher`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `brand`
--
ALTER TABLE `brand`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `brand_catelogy`
--
ALTER TABLE `brand_catelogy`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=476;

--
-- AUTO_INCREMENT for table `catelogy`
--
ALTER TABLE `catelogy`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=115;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `order_products`
--
ALTER TABLE `order_products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `otp`
--
ALTER TABLE `otp`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT for table `product_detail`
--
ALTER TABLE `product_detail`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT for table `ship`
--
ALTER TABLE `ship`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100537106;

--
-- AUTO_INCREMENT for table `voucher`
--
ALTER TABLE `voucher`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `address_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `brand_catelogy`
--
ALTER TABLE `brand_catelogy`
  ADD CONSTRAINT `brand_catelogy_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`id`),
  ADD CONSTRAINT `brand_catelogy_ibfk_2` FOREIGN KEY (`catelogy_id`) REFERENCES `catelogy` (`id`);

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`ship_id`) REFERENCES `ship` (`id`),
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`voucher_id`) REFERENCES `voucher` (`id`);

--
-- Constraints for table `order_products`
--
ALTER TABLE `order_products`
  ADD CONSTRAINT `order_products_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `order_products_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

--
-- Constraints for table `otp`
--
ALTER TABLE `otp`
  ADD CONSTRAINT `otp_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`catelogy_id`) REFERENCES `catelogy` (`id`),
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`id`);

--
-- Constraints for table `product_detail`
--
ALTER TABLE `product_detail`
  ADD CONSTRAINT `product_detail_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

--
-- Constraints for table `ship`
--
ALTER TABLE `ship`
  ADD CONSTRAINT `ship_ibfk_1` FOREIGN KEY (`to_address_id`) REFERENCES `address` (`id`);

DELIMITER $$
--
-- Events
--
CREATE DEFINER=`root`@`localhost` EVENT `DeleteOldOTPEvent` ON SCHEDULE EVERY 1 MINUTE STARTS '2023-11-17 14:04:50' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
    CALL DeleteOldOTP();
END$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
