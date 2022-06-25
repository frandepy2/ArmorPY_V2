/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 100419
 Source Host           : localhost:3306
 Source Schema         : armorpy

 Target Server Type    : MySQL
 Target Server Version : 100419
 File Encoding         : 65001

 Date: 25/06/2022 11:22:11
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for cliente
-- ----------------------------
DROP TABLE IF EXISTS `cliente`;
CREATE TABLE `cliente`  (
  `cliente_id` int NOT NULL AUTO_INCREMENT,
  `cliente_nombre` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `cliente_apellido` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `cliente_ci` int NOT NULL,
  `cliente_deuda` double NULL DEFAULT NULL,
  PRIMARY KEY (`cliente_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for detalle
-- ----------------------------
DROP TABLE IF EXISTS `detalle`;
CREATE TABLE `detalle`  (
  `detalle_id` int NOT NULL AUTO_INCREMENT,
  `producto_id` int NOT NULL,
  `transaccion_id` int NOT NULL,
  `transaccion_cantidad` int NOT NULL,
  PRIMARY KEY (`detalle_id`) USING BTREE,
  INDEX `fk_producto_id`(`producto_id`) USING BTREE,
  INDEX `fk_transaccion_id`(`transaccion_id`) USING BTREE,
  CONSTRAINT `fk_producto_id` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`producto_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_transaccion_id` FOREIGN KEY (`transaccion_id`) REFERENCES `transaccion` (`transaccion_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for producto
-- ----------------------------
DROP TABLE IF EXISTS `producto`;
CREATE TABLE `producto`  (
  `producto_id` int NOT NULL AUTO_INCREMENT,
  `producto_nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `producto_descripcion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `producto_url_foto` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `producto_precio` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`producto_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for producto_promocion
-- ----------------------------
DROP TABLE IF EXISTS `producto_promocion`;
CREATE TABLE `producto_promocion`  (
  `producto_id` int NOT NULL,
  `promocion_id` int NOT NULL,
  INDEX `fk_producto`(`producto_id`) USING BTREE,
  INDEX `fk_promocion`(`promocion_id`) USING BTREE,
  CONSTRAINT `fk_producto` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`producto_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_promocion` FOREIGN KEY (`promocion_id`) REFERENCES `promocion` (`promocion_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for promocion
-- ----------------------------
DROP TABLE IF EXISTS `promocion`;
CREATE TABLE `promocion`  (
  `promocion_id` int NOT NULL AUTO_INCREMENT,
  `promocion_tipo` int NOT NULL,
  `promocion_fecha_inicio` date NOT NULL,
  `promocion_fecha_fin` date NOT NULL,
  `cantidad` int NULL DEFAULT NULL,
  `porcentaje` int NULL DEFAULT NULL,
  PRIMARY KEY (`promocion_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for transaccion
-- ----------------------------
DROP TABLE IF EXISTS `transaccion`;
CREATE TABLE `transaccion`  (
  `transaccion_id` int NOT NULL AUTO_INCREMENT,
  `transaccion_fecha` date NOT NULL,
  `cliente_id` int NULL DEFAULT NULL,
  `precio_total` double NOT NULL,
  `pagado` tinyint NULL DEFAULT NULL,
  `fecha_pago` date NULL DEFAULT NULL,
  PRIMARY KEY (`transaccion_id`) USING BTREE,
  INDEX `transaccion`(`cliente_id`) USING BTREE,
  CONSTRAINT `transaccion` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`cliente_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for usuario
-- ----------------------------
DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario`  (
  `usuario_id` int NOT NULL AUTO_INCREMENT,
  `usuario_nombre` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `usuario_password` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `usuario_rol` int NOT NULL,
  `usuario_activo` tinyint NULL DEFAULT NULL,
  PRIMARY KEY (`usuario_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- View structure for vista_promos
-- ----------------------------
DROP VIEW IF EXISTS `vista_promos`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `vista_promos` AS SELECT p1.promocion_id, pr1.producto_id, pr1.producto_nombre, pr1.producto_precio, p1.promocion_tipo, p1.promocion_fecha_inicio, p1.promocion_fecha_fin, p1.cantidad, p1.porcentaje
	FROM producto_promocion pp1
	LEFT JOIN promocion p1 ON  p1.promocion_id = pp1.promocion_id
	LEFT JOIN producto pr1 ON pp1.producto_id = pr1.producto_id ;

SET FOREIGN_KEY_CHECKS = 1;
