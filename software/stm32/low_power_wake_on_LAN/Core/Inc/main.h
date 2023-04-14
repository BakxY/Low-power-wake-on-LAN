/* USER CODE BEGIN Header */
/**
  ******************************************************************************
  * @file           : main.h
  * @brief          : Header for main.c file.
  *                   This file contains the common defines of the application.
  ******************************************************************************
  * @attention
  *
  * Copyright (c) 2023 STMicroelectronics.
  * All rights reserved.
  *
  * This software is licensed under terms that can be found in the LICENSE file
  * in the root directory of this software component.
  * If no LICENSE file comes with this software, it is provided AS-IS.
  *
  ******************************************************************************
  */
/* USER CODE END Header */

/* Define to prevent recursive inclusion -------------------------------------*/
#ifndef __MAIN_H
#define __MAIN_H

#ifdef __cplusplus
extern "C" {
#endif

/* Includes ------------------------------------------------------------------*/
#include "stm32g4xx_hal.h"

/* Private includes ----------------------------------------------------------*/
/* USER CODE BEGIN Includes */

/* USER CODE END Includes */

/* Exported types ------------------------------------------------------------*/
/* USER CODE BEGIN ET */

/* USER CODE END ET */

/* Exported constants --------------------------------------------------------*/
/* USER CODE BEGIN EC */

/* USER CODE END EC */

/* Exported macro ------------------------------------------------------------*/
/* USER CODE BEGIN EM */

/* USER CODE END EM */

/* Exported functions prototypes ---------------------------------------------*/
void Error_Handler(void);

/* USER CODE BEGIN EFP */

/* USER CODE END EFP */

/* Private defines -----------------------------------------------------------*/
#define ETH_nTCPCS_Pin GPIO_PIN_0
#define ETH_nTCPCS_GPIO_Port GPIOA
#define ETH_nFAC_Pin GPIO_PIN_1
#define ETH_nFAC_GPIO_Port GPIOA
#define STM_TX_Pin GPIO_PIN_2
#define STM_TX_GPIO_Port GPIOA
#define STM_RX_Pin GPIO_PIN_3
#define STM_RX_GPIO_Port GPIOA
#define ETH_CFG_Pin GPIO_PIN_4
#define ETH_CFG_GPIO_Port GPIOA
#define ETH_CFGEN_Pin GPIO_PIN_5
#define ETH_CFGEN_GPIO_Port GPIOA
#define ETH_RUN_Pin GPIO_PIN_6
#define ETH_RUN_GPIO_Port GPIOA
#define ETH_nRST_Pin GPIO_PIN_7
#define ETH_nRST_GPIO_Port GPIOA
#define USB_DN_Pin GPIO_PIN_11
#define USB_DN_GPIO_Port GPIOA
#define SWDIO_Pin GPIO_PIN_13
#define SWDIO_GPIO_Port GPIOA
#define SWCLK_Pin GPIO_PIN_14
#define SWCLK_GPIO_Port GPIOA

/* USER CODE BEGIN Private defines */

/* USER CODE END Private defines */

#ifdef __cplusplus
}
#endif

#endif /* __MAIN_H */
