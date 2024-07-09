-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th7 09, 2024 lúc 11:27 AM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `playstation`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `adminaccount`
--

CREATE TABLE `adminaccount` (
  `ID` int(11) NOT NULL,
  `EMAIL` varchar(50) NOT NULL,
  `MATKHAU` varchar(50) NOT NULL,
  `HOTEN` varchar(50) DEFAULT NULL,
  `SDT` varchar(20) NOT NULL,
  `TRANGTHAI` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `adminaccount`
--

INSERT INTO `adminaccount` (`ID`, `EMAIL`, `MATKHAU`, `HOTEN`, `SDT`, `TRANGTHAI`) VALUES
(1, 'lvkt0177@gmail.com', 'Thinh3988', 'Lê Thịnh', '0857853419', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bestgame`
--

CREATE TABLE `bestgame` (
  `ID` int(11) NOT NULL,
  `IDGAME` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart`
--

CREATE TABLE `cart` (
  `ID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `create_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart_item`
--

CREATE TABLE `cart_item` (
  `ID` int(11) NOT NULL,
  `iDCart` int(11) NOT NULL,
  `gameID` int(11) NOT NULL,
  `devicesID` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `devices`
--

CREATE TABLE `devices` (
  `ID` int(11) NOT NULL,
  `TENSP` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NSX` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `GIATIEN` int(50) DEFAULT NULL,
  `MOTA` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `HINHANH` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CHITIETANH` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `SOLUONG` int(20) DEFAULT NULL,
  `NGAYSX` datetime DEFAULT NULL,
  `BAOHANH` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `devices`
--

INSERT INTO `devices` (`ID`, `TENSP`, `NSX`, `GIATIEN`, `MOTA`, `HINHANH`, `CHITIETANH`, `SOLUONG`, `NGAYSX`, `BAOHANH`) VALUES
(60, 'PULSE Explore™ Wireless Earbuds', 'PlayStation®', 99, '<p class=\"txt-style-secondary txt-block-title__paragraph txt-style-secondary--secondary\" style=\"-webkit-font-smoothing: antialiased; line-height: 1.5em; box-sizing: border-box; margin: 0px; font-size: var(--text-3); --type-margin-top: var(--space-5); --type-margin-bottom: var(--space-5); margin-block-start: 0px; margin-block-end: var(--type-margin-bottom); color: var(--type-custom-color,var(--type-style-color)); --type-style-color: var(--color-role-text-secondary); font-family: sst, Arial, sans-serif; background-color: #ffffff;\"><span style=\"font-size: 14pt;\"><span style=\"color: #6b6b6b; font-family: sst, Arial, sans-serif; font-size: 16px; background-color: #ffffff;\">Enjoy lifelike gaming audio wherever play takes you with a portable design equipped with hidden microphones and a companion charging case.</span></p>', 'z5394094719183_d60c80a36491df04ddf475166947ddc3.jpg', '{\"imgDetails\":[{\"image\":\"z5394094719183_d60c80a36491df04ddf475166947ddc3.jpg\"}]}', 10, '2024-06-15 00:00:00', '2 years'),
(62, 'DualSense Edge™ Wireless Controller', 'PlayStation®', 99, '<p class=\"txt-style-secondary txt-block-title__paragraph txt-style-secondary--secondary\" style=\"-webkit-font-smoothing: antialiased; line-height: 1.5em; box-sizing: border-box; margin: 0px; font-size: var(--text-3); --type-margin-top: var(--space-5); --type-margin-bottom: var(--space-5); margin-block-start: 0px; margin-block-end: var(--type-margin-bottom); color: var(--type-custom-color,var(--type-style-color)); --type-style-color: var(--color-role-text-secondary); font-family: sst, Arial, sans-serif; background-color: #ffffff;\"><span style=\"font-size: 14pt;\">Get an edge in gameplay with remappable buttons, tuneable triggers and sticks, changeable stick caps, back buttons, and more.</span></p>', 'z5394094702247_d95c7a6986ab4c23bad55801891ab70f.jpg', '{\"imgDetails\":[{\"image\":\"z5394094702247_d95c7a6986ab4c23bad55801891ab70f.jpg\"}]}', 11, '2024-06-15 00:00:00', '2 years'),
(63, 'Media Remote', 'PlayStation®', 189, '<p><span style=\"color: #6b6b6b; font-family: sst, Arial, sans-serif; font-size: 14pt; background-color: #ffffff;\">Conveniently control movies, streaming services and more on your PS5 console with an intuitive layout.</span></p>', 'Deviece.jpg', '{\"imgDetails\":[{\"image\":\"Deviece.jpg\"}]}', 11, '2024-06-15 00:00:00', '2 years'),
(64, 'Access™ Controller', 'PlayStation®', 99, '<p><span style=\"color: #6b6b6b; font-family: sst, Arial, sans-serif; font-size: 14pt; background-color: #ffffff;\">A highly customisable PlayStation&reg;5 controller kit designed to make gaming more accessible.</span></p>', 'z5394094699691_34ae60f4d4353e97a86aa695798bdd9c.jpg', '{\"imgDetails\":[{\"image\":\"z5394094699691_34ae60f4d4353e97a86aa695798bdd9c.jpg\"}]}', 11, '2024-06-15 00:00:00', '2 years'),
(66, 'PlayStation Portal™ Remote Player', 'PlayStation®', 109, '<p><span style=\"color: #6b6b6b; font-family: sst, Arial, sans-serif; font-size: 14pt; background-color: #ffffff;\">Play your PS5 console over your home Wi-Fi with console quality controls.</span></p>', 'z5394094719778_2d48dd7f76b84c0ddb965c9d4ee74d7f.jpg', '{\"imgDetails\":[{\"image\":\"z5394094719778_2d48dd7f76b84c0ddb965c9d4ee74d7f.jpg\"}]}', 11, '2024-06-15 00:00:00', '2 years'),
(67, 'PULSE Elite™ Wireless Headset', 'PlayStation®', 106, '<p><span style=\"color: #6b6b6b; font-family: sst, Arial, sans-serif; font-size: 14pt; background-color: #ffffff;\">Enjoy lifelike gaming audio in a comfortable headset design equipped with a retractable microphone and built-in long-life battery</span></p>', 'z5394094719779_2959c7a4c779680ffbaf617db7abb9b1.jpg', '{\"imgDetails\":[{\"image\":\"z5394094719779_2959c7a4c779680ffbaf617db7abb9b1.jpg\"}]}', 11, '2024-06-15 00:00:00', '5 days'),
(68, 'HD Camera', 'PlayStation®', 201, '<p><span style=\"color: #6b6b6b; font-family: sst, Arial, sans-serif; font-size: 14px; background-color: #ffffff;\">Add yourself to your gameplay videos and broadcasts with smooth, sharp, full-HD capture.</span></p>', 'Devieces.jpg', '{\"imgDetails\":[{\"image\":\"Devieces.jpg\"}]}', 11, '2024-06-15 00:00:00', '9 years');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `gameproduct`
--

CREATE TABLE `gameproduct` (
  `ID` int(11) NOT NULL,
  `tenGame` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `theLoai` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `hinhNen` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `gia` int(50) NOT NULL,
  `moTa` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `ngayRaMat` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `gameproduct`
--

INSERT INTO `gameproduct` (`ID`, `tenGame`, `theLoai`, `hinhNen`, `gia`, `moTa`, `ngayRaMat`) VALUES
(1, 'God of War™ Ragnarök', 'Survival Horror', 'god_of_war_av.jpg', 310, '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ipsa repellat aspernatur voluptates, recusandae magnam eos officia quasi quam natus repudiandae asperiores ut corrupti eius error magni totam nobis amet?</p>\r\n<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ipsa repellat aspernatur voluptates, recusandae magnam eos officia quasi quam natus repudiandae asperiores ut corrupti eius error magni totam nobis amet?Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ipsa repellat aspernatur voluptates, recusandae magnam eos officia quasi quam natus repudiandae asperiores ut corrupti eius error magni totam nobis amet?</p>\r\n<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ipsa repellat aspernatur voluptates, recusandae magnam eos officia quasi quam natus repudiandae asperiores ut corrupti eius error magni totam nobis amet?</p>', '2023-03-18'),
(2, 'Resident Evil Village', 'Survival Horror', 'maxresdefault.jpg', 250, '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ipsa repellat aspernatur voluptates, recusandae magnam eos officia quasi quam natus repudiandae asperiores ut corrupti eius error magni totam nobis amet? Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ipsa repellat aspernatur voluptates, recusandae magnam eos officia quasi quam natus repudiandae asperiores ut corrupti eius error magni totam nobis amet?</p>\r\n<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ipsa repellat aspernatur voluptates, recusandae magnam eos officia quasi quam natus repudiandae asperiores ut corrupti eius error magni totam nobis amet?</p>\r\n<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ipsa repellat aspernatur voluptates, recusandae magnam eos officia quasi quam natus repudiandae asperiores ut corrupti eius error magni totam nobis amet? Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ipsa repellat aspernatur voluptates, recusandae magnam eos officia quasi quam natus repudiandae asperiores ut corrupti eius error magni totam nobis amet?</p>\r\n<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ipsa repellat aspernatur voluptates, recusandae magnam eos officia quasi quam natus repudiandae asperiores ut corrupti eius error magni totam nobis amet?</p>', '2023-03-26'),
(3, 'Dragon\'s Dogma II', 'Action Role-Playing', 'ring_1.jpg', 810, '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ipsa repellat aspernatur voluptates, recusandae magnam eos officia quasi quam natus repudiandae asperiores ut corrupti eius error magni totam nobis amet?</p>\r\n<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ipsa repellat aspernatur voluptates, recusandae magnam eos officia quasi quam natus repudiandae asperiores ut corrupti eius error magni totam nobis amet?</p>\r\n<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ipsa repellat aspernatur voluptates, recusandae magnam eos officia quasi quam natus repudiandae asperiores ut corrupti eius error magni totam nobis amet?</p>', '2023-04-22'),
(4, 'Stellar Blade', 'Sci-fi action', 'z5_av.jpg', 630, '...', '2023-08-24'),
(5, 'Rise of the Ronin', 'Action-Adventure', 'ronin_2.jpg', 580, '...', '2024-01-25'),
(6, 'Call Of Duty 2', 'First-person shooter', 'call_of_duty.jpg', 110, '...', '2022-04-25'),
(7, 'EA SPORTS™ FC 24', 'Sports simulation', 'pes.jpg', 280, '...', '2022-04-25'),
(8, 'SILENT HILL 2', 'Survival Horror', 'silence.jpg', 910, '...', '2024-08-25'),
(9, 'Tales of Kenzera™: ZAU', 'Role-playing Game', 'zen.jpg', 520, '...', '2024-07-25'),
(10, 'Star Wars Outlaws', 'Action-Adventure', 'star_wars.jpg', 720, '...', '2024-04-25'),
(11, 'Marvel\'s Spider-Man 2', 'Action-Adventure', 'spider_1.jpg', 620, '...', '2024-04-09');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `news`
--

CREATE TABLE `news` (
  `ID` int(11) NOT NULL,
  `noiDung` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `news`
--

INSERT INTO `news` (`ID`, `noiDung`) VALUES
(4, '{\"book\":[]}'),
(6, '{\"book\":[{\"image\":\"HEEEE\"},{\"image\":\"Lụm kèo 21\"}]}');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `populargame`
--

CREATE TABLE `populargame` (
  `ID` int(11) NOT NULL,
  `IDGAME` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `populargame`
--

INSERT INTO `populargame` (`ID`, `IDGAME`) VALUES
(10, 1),
(4, 4),
(5, 5),
(11, 7),
(6, 8);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `popularnews`
--

CREATE TABLE `popularnews` (
  `ID` int(11) NOT NULL,
  `IDNEWS` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `popularnews`
--

INSERT INTO `popularnews` (`ID`, `IDNEWS`) VALUES
(1, 5),
(2, 6),
(3, 7);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `prominentdevices`
--

CREATE TABLE `prominentdevices` (
  `ID` int(11) NOT NULL,
  `IDDEVICE` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tintuc`
--

CREATE TABLE `tintuc` (
  `ID` int(11) NOT NULL,
  `TIEUDE` varchar(250) DEFAULT NULL,
  `HINHANH` varchar(50) DEFAULT NULL,
  `TOMTAT` longtext DEFAULT NULL,
  `NOIDUNG` longtext DEFAULT NULL,
  `NGAYDANG` datetime DEFAULT NULL,
  `TRANGTHAI` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `tintuc`
--

INSERT INTO `tintuc` (`ID`, `TIEUDE`, `HINHANH`, `TOMTAT`, `NOIDUNG`, `NGAYDANG`, `TRANGTHAI`) VALUES
(1, 'God Of War TOP 1 BXH', 'god_of_war_av.jpg', 'Hey everyone, Ghost of Tsushima Director’s Cut is coming to PC on May 16! Today we’re giving you all the details on cross-play support in Legends mode and the inclusion of a new PlayStation overlay, with support for PlayStation Trophies and more. As we’ve announced previously, Ghost on Tsushima Director’s Cut on PC contains the […]', '', '2024-07-25 00:00:00', 1),
(2, 'God Of War TOP 1 BXH', 'ronin_1.jpg', 'Hey everyone, Ghost of Tsushima Director’s Cut is coming to PC on May 16! Today we’re giving you all the details on cross-play support in Legends mode and the inclusion of a new PlayStation overlay, with support for PlayStation Trophies and more. As we’ve announced previously, Ghost on Tsushima Director’s Cut on PC contains the […]', ' ', '2024-07-25 00:00:00', 1),
(3, 'God Of War TOP 1 BXH', 'z5_av.jpg', 'Hey everyone, Ghost of Tsushima Director’s Cut is coming to PC on May 16! Today we’re giving you all the details on cross-play support in Legends mode and the inclusion of a new PlayStation overlay, with support for PlayStation Trophies and more. As we’ve announced previously, Ghost on Tsushima Director’s Cut on PC contains the […]', ' ', '2024-07-25 00:00:00', 1),
(4, 'God Of War TOP 1 BXH', 'zen.jpg', 'Hey everyone, Ghost of Tsushima Director’s Cut is coming to PC on May 16! Today we’re giving you all the details on cross-play support in Legends mode and the inclusion of a new PlayStation overlay, with support for PlayStation Trophies and more. As we’ve announced previously, Ghost on Tsushima Director’s Cut on PC contains the […]', ' ', '2024-07-25 00:00:00', 1),
(5, 'New releases', 'z5_2.jpg', 'Check out the month\'s biggest new titles, including Stellar Blade.', ' ', '2024-07-25 00:00:00', 0),
(6, 'The best puzzle games on PS4 & PS5', 'puzzle.jpg', '', ' ', '2024-07-25 00:00:00', 0),
(7, 'The best new and upcoming PS5 games of 2024', 'bestgame.jpg', 'Discover the best upcoming games for PlayStation 5 that you can look forward to playing in the year ahead.', ' ', '2024-07-25 00:00:00', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `upcominggame`
--

CREATE TABLE `upcominggame` (
  `ID` int(11) NOT NULL,
  `IDGAME` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `upcominggame`
--

INSERT INTO `upcominggame` (`ID`, `IDGAME`) VALUES
(1, 6),
(2, 7),
(3, 10),
(4, 11);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `TAIKHOAN` varchar(50) NOT NULL,
  `MATKHAU` varchar(50) NOT NULL,
  `HOTEN` varchar(50) DEFAULT NULL,
  `SDT` varchar(50) NOT NULL,
  `EMAIL` varchar(50) NOT NULL,
  `TRANGTHAI` int(11) NOT NULL,
  `HINHNEN` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`ID`, `TAIKHOAN`, `MATKHAU`, `HOTEN`, `SDT`, `EMAIL`, `TRANGTHAI`, `HINHNEN`) VALUES
(5, 'lvkt3988', 'Thinh0177', 'Lê Văn Khánh Thịnhh', '0945349679', 'lvkt0177@gmail.com', 1, 'user-image.png');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `adminaccount`
--
ALTER TABLE `adminaccount`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `bestgame`
--
ALTER TABLE `bestgame`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_IDGAME_bestGame` (`IDGAME`);

--
-- Chỉ mục cho bảng `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_Cart_User` (`userID`);

--
-- Chỉ mục cho bảng `cart_item`
--
ALTER TABLE `cart_item`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_CartItem_Cart` (`iDCart`),
  ADD KEY `gameID_CartItem_gameproduct` (`gameID`),
  ADD KEY `devicesID_CartItem_devices` (`devicesID`);

--
-- Chỉ mục cho bảng `devices`
--
ALTER TABLE `devices`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `gameproduct`
--
ALTER TABLE `gameproduct`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `populargame`
--
ALTER TABLE `populargame`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_IDGAME` (`IDGAME`);

--
-- Chỉ mục cho bảng `popularnews`
--
ALTER TABLE `popularnews`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_IDNEWS_NEWS` (`IDNEWS`);

--
-- Chỉ mục cho bảng `prominentdevices`
--
ALTER TABLE `prominentdevices`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_IDDEVICES_HOTDEVIECES` (`IDDEVICE`);

--
-- Chỉ mục cho bảng `tintuc`
--
ALTER TABLE `tintuc`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `upcominggame`
--
ALTER TABLE `upcominggame`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_IDGAME_UC` (`IDGAME`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `adminaccount`
--
ALTER TABLE `adminaccount`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `bestgame`
--
ALTER TABLE `bestgame`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `cart`
--
ALTER TABLE `cart`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `cart_item`
--
ALTER TABLE `cart_item`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `devices`
--
ALTER TABLE `devices`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT cho bảng `news`
--
ALTER TABLE `news`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `populargame`
--
ALTER TABLE `populargame`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `popularnews`
--
ALTER TABLE `popularnews`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `prominentdevices`
--
ALTER TABLE `prominentdevices`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `tintuc`
--
ALTER TABLE `tintuc`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `upcominggame`
--
ALTER TABLE `upcominggame`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `bestgame`
--
ALTER TABLE `bestgame`
  ADD CONSTRAINT `ID_IDGAME_bestGame` FOREIGN KEY (`IDGAME`) REFERENCES `gameproduct` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `ID_Cart_User` FOREIGN KEY (`userID`) REFERENCES `users` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `cart_item`
--
ALTER TABLE `cart_item`
  ADD CONSTRAINT `ID_CartItem_Cart` FOREIGN KEY (`iDCart`) REFERENCES `cart` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `devicesID_CartItem_devices` FOREIGN KEY (`devicesID`) REFERENCES `devices` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `gameID_CartItem_gameproduct` FOREIGN KEY (`gameID`) REFERENCES `gameproduct` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `populargame`
--
ALTER TABLE `populargame`
  ADD CONSTRAINT `ID_IDGAME` FOREIGN KEY (`IDGAME`) REFERENCES `gameproduct` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `popularnews`
--
ALTER TABLE `popularnews`
  ADD CONSTRAINT `ID_IDNEWS_NEWS` FOREIGN KEY (`IDNEWS`) REFERENCES `tintuc` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `prominentdevices`
--
ALTER TABLE `prominentdevices`
  ADD CONSTRAINT `ID_IDDEVICES_HOTDEVIECES` FOREIGN KEY (`IDDEVICE`) REFERENCES `devices` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `upcominggame`
--
ALTER TABLE `upcominggame`
  ADD CONSTRAINT `ID_IDGAME_UC` FOREIGN KEY (`IDGAME`) REFERENCES `gameproduct` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
