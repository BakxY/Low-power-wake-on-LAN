/*
 * CH9120.c
 *
 *  Created on: Apr 14, 2023
 *      Author: Severin Sprenger
 */

#include "CH9120.h"

HAL_StatusTypeDef StringToAddress(char ipStr[17], IPAddress *ipStruct)
{
	uint8_t CutString[4] = { 0, 0, 0, 0 };
	uint8_t CutStrArrIndex = 0;

	for(uint8_t i = 0; i < 17; i++)
	{
		if(ipStr[i] != '.')
		{
			CutString[CutStrArrIndex] = CutString[CutStrArrIndex] * 10 + (ipStr[i] - '0');
		}
		else
		{
			CutStrArrIndex++;
		}

		if(CutStrArrIndex > 3)
		{
			return HAL_ERROR;
		}
	}

	for(uint8_t i = 0; i < 4; i++)
	{
		if(CutString[i] < 256)
		{
			ipStruct->IPByte[i] = CutString[i];
		}
		else
		{
			return HAL_ERROR;
		}
	}

	return HAL_OK;
}

