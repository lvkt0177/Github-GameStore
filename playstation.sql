-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th4 29, 2024 lúc 10:22 AM
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
-- Cấu trúc bảng cho bảng `bestgame`
--

CREATE TABLE `bestgame` (
  `ID` int(11) NOT NULL,
  `IDGAME` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `devices`
--

CREATE TABLE `devices` (
  `ID` int(11) NOT NULL,
  `TENSP` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NSX` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `GIATIEN` int(50) DEFAULT NULL,
  `MAUSP` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `MOTA` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `HINHANH` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `SOLUONG` int(20) DEFAULT NULL,
  `BAOHANH` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `devices`
--

INSERT INTO `devices` (`ID`, `TENSP`, `NSX`, `GIATIEN`, `MAUSP`, `MOTA`, `HINHANH`, `SOLUONG`, `BAOHANH`) VALUES
(1, 'PlayStation Portal™ Remote Player', 'PlayStation®', 199, 'white', '...', '4.jpg', 9, '2 Years'),
(2, 'PULSE Elite™ Wireless Headset', 'PlayStation®', 299, 'white', '...', '5.jpg', 9, '2 Years'),
(3, 'PULSE Explore™ Wireless Earbuds', 'PlayStation®', 399, 'white', '...', '3.jpg', 9, '2 Years'),
(4, 'DualSense Edge™ Wireless Controller', 'PlayStation®', 499, 'white', '...', '2.jpg', 9, '2 Years'),
(5, 'Access™ Controller', 'PlayStation®', 99, 'white', '...', '1.jpg', 9, '1 Years');

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
  `moTa` varchar(300) CHARACTER SET armscii8 COLLATE armscii8_general_ci NOT NULL,
  `ngayRaMat` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `gameproduct`
--

INSERT INTO `gameproduct` (`ID`, `tenGame`, `theLoai`, `hinhNen`, `gia`, `moTa`, `ngayRaMat`) VALUES
(1, 'God of War™ Ragnarök', 'Action-Adventure', 'god_of_war_av.jpg', 310, '...', '2023-04-25'),
(2, 'Resident Evil Village', 'Survival Horror', 'rev_evil_1.jpg', 310, '...', '2023-09-25'),
(3, 'Dragon\'s Dogma II', 'Action Role-Playing', 'ring_1.jpg', 810, '...', '2023-04-25'),
(4, 'Stellar Blade', 'Sci-fi action', 'z5_av.jpg', 630, '...', '2023-08-25'),
(5, 'Rise of the Ronin', 'Action-Adventure', 'ronin_2.jpg', 580, '...', '2024-01-25'),
(6, 'Call Of Duty 2', 'First-person shooter', 'call_of_duty.jpg', 110, '...', '2022-04-25'),
(7, 'EA SPORTS™ FC 24', 'Sports simulation', 'pes.jpg', 280, '...', '2022-04-25'),
(8, 'SILENT HILL 2', 'Survival Horror', 'silence.jpg', 910, '...', '2024-08-25'),
(9, 'Tales of Kenzera™: ZAU', 'Role-playing Game', 'zen.jpg', 520, '...', '2024-07-25'),
(10, 'Star Wars Outlaws', 'Action-Adventure', 'star_wars.jpg', 720, '...', '2024-04-25'),
(11, 'Marvel\'s Spider-Man 2', 'Action-Adventure', 'spider_1.jpg', 620, '...', '0000-00-00');

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
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 8),
(7, 9);

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
(1, 'God Of War TOP 1 BXH','god_of_war_av.jpg', 'Hey everyone, Ghost of Tsushima Director’s Cut is coming to PC on May 16! Today we’re giving you all the details on cross-play support in Legends mode and the inclusion of a new PlayStation overlay, with support for PlayStation Trophies and more. As we’ve announced previously, Ghost on Tsushima Director’s Cut on PC contains the […]', '', '2024-07-25 00:00:00', 1),
(2, 'God Of War TOP 1 BXH','ronin_1.jpg', 'Hey everyone, Ghost of Tsushima Director’s Cut is coming to PC on May 16! Today we’re giving you all the details on cross-play support in Legends mode and the inclusion of a new PlayStation overlay, with support for PlayStation Trophies and more. As we’ve announced previously, Ghost on Tsushima Director’s Cut on PC contains the […]', ' ', '2024-07-25 00:00:00', 1),
(3, 'God Of War TOP 1 BXH','z5_av.jpg', 'Hey everyone, Ghost of Tsushima Director’s Cut is coming to PC on May 16! Today we’re giving you all the details on cross-play support in Legends mode and the inclusion of a new PlayStation overlay, with support for PlayStation Trophies and more. As we’ve announced previously, Ghost on Tsushima Director’s Cut on PC contains the […]', ' ', '2024-07-25 00:00:00', 1),
(4, 'God Of War TOP 1 BXH','zen.jpg', 'Hey everyone, Ghost of Tsushima Director’s Cut is coming to PC on May 16! Today we’re giving you all the details on cross-play support in Legends mode and the inclusion of a new PlayStation overlay, with support for PlayStation Trophies and more. As we’ve announced previously, Ghost on Tsushima Director’s Cut on PC contains the […]', ' ', '2024-07-25 00:00:00', 1),
(5, 'New releases', 'z5_2.jpg', 'Check out the month''s biggest new titles, including Stellar Blade.', ' ', '2024-07-25 00:00:00', 0),
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

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `bestgame`
--
ALTER TABLE `bestgame`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_IDGAME_bestGame` (`IDGAME`);

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
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `bestgame`
--
ALTER TABLE `bestgame`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `devices`
--
ALTER TABLE `devices`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `populargame`
--
ALTER TABLE `populargame`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `bestgame`
--
ALTER TABLE `bestgame`
  ADD CONSTRAINT `ID_IDGAME_bestGame` FOREIGN KEY (`IDGAME`) REFERENCES `gameproduct` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

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
