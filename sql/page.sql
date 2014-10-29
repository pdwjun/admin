-- phpMyAdmin SQL Dump
-- version 3.3.2deb1ubuntu1
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2014 年 10 月 29 日 09:15
-- 服务器版本: 5.5.34
-- PHP 版本: 5.4.34-1+deb.sury.org~lucid+1

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `page`
--

-- --------------------------------------------------------

--
-- 表的结构 `page`
--

CREATE TABLE IF NOT EXISTS `page` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `content` varchar(512) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=20 ;

--
-- 转存表中的数据 `page`
--

INSERT INTO `page` (`id`, `content`) VALUES
(1, 'AB111<a href="http://www.baidu.com">baidu</a>'),
(3, '<a href="http://news.baidu.com">å†…å†…66</a>'),
(5, 'CD222'),
(7, 'å†…å†…77'),
(9, 'xxxx'),
(11, '<a href="http://192.168.72.31/admin/edit.html">èŠ‚å·¥</a>'),
(13, 'AB444'),
(15, 'å†…å†…999'),
(17, '<a href="http://aaa">cccce åœ¨åœ¨</a>'),
(19, 'å†…å†…000');
