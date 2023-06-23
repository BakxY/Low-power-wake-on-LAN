/*
 * CH9120.h
 *
 *  Created on: Apr 14, 2023
 *      Author: Severin Sprenger
 */

#ifndef LIB_CH9120_H_
#define LIB_CH9120_H_

#include "stm32g4xx_hal.h"

// IP Byte mapping: IPByte[3].IPByte[2].IPByte[1].IPByte[0]
typedef struct
{
	// IP Bytes
	uint8_t IPByte[4];
} IPAddress;

typedef struct
{
	// IP
	IPAddress IP;

	// Gateway
	IPAddress Gateway;

	// Subnet
	IPAddress Subnet;
} ChipSettings;

typedef enum
{
	CH9120_TCP_Server = 0,
	CH9120_TCP_Client = 1,
	CH9120_UDP_Server = 2,
	CH9120_UDP_Client = 3
} CH9120_OP_MODE;

typedef enum
{
	CH9120_TCP_Disconnected = 0,
	CH9120_TCP_Connected = 1
} CH9120_TCP_CONNECTION;

typedef enum
{
	CH9120_Cable_Connected = 0,
	CH9120_Cable_Disconnected = 1
} CH9120_CABLE_STATUS;

HAL_StatusTypeDef StringToAddress(char[], IPAddress*);

HAL_StatusTypeDef resetChip(void);

HAL_StatusTypeDef getDeviceIP(IPAddress*);
HAL_StatusTypeDef getTargetIP(IPAddress*);
HAL_StatusTypeDef getTargetPort(uint16_t*);
HAL_StatusTypeDef getOpMode(CH9120_OP_MODE*);

HAL_StatusTypeDef setDeviceIP(ChipSettings);
HAL_StatusTypeDef setTargetIP(IPAddress);
HAL_StatusTypeDef setTargetPort(uint8_t);
HAL_StatusTypeDef setDHCPStatus(uint8_t);
HAL_StatusTypeDef setOpMode(CH9120_OP_MODE*);

HAL_StatusTypeDef getTCPConStatus(CH9120_TCP_CONNECTION*);
HAL_StatusTypeDef getCableStatus(CH9120_CABLE_STATUS*);

#endif /* LIB_CH9120_H_ */
