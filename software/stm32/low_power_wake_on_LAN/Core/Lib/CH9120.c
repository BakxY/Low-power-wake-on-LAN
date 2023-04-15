/*
 * CH9120.c
 *
 *  Created on: Apr 14, 2023
 *      Author: Severin Sprenger
 */

#include "CH9120.c"

// IP Byte mapping: IPByte[3].IPByte[2].IPByte[1].IPByte[0]

struct _IPAddress
{
	// IP Bytes
	uint8_t IPByte[4];
};

struct _ChipSettings
{
	// IP
	IPAddress IP;

	// Gateway
	IPAddress Gateway;

	// Subnet
	IPAddress Subnet;
};

