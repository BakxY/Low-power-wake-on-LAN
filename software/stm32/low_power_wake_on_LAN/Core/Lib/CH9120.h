/*
 * CH9120.h
 *
 *  Created on: Apr 14, 2023
 *      Author: Severin Sprenger
 */

#ifndef LIB_CH9120_H_
#define LIB_CH9120_H_

struct _IPAddress;
typedef struct _IPAddress IPAddress;

struct _ChipSettings;
typedef struct _ChipSettings ChipSettings;

IPAddress StringToAddress(char[]);

uint8_t resetChip(void);

IPAddress getDeviceIP(void);
IPAddress getTargetIP(void);
uint8_t getTargetPort(void);
uint8_t getDHCPStatus(void);
uint8_t getOpMode(void);

uint8_t setDeviceIP(ChipSettings);
uint8_t setTargetIP(IPAddress);
uint8_t setTargetPort(uint8_t);
uint8_t setDHCPStatus(uint8_t);
uint8_t setOpMode(void);

uint8_t getTCPConStatus(void);
uint8_t getCableStatus(void);

#endif /* LIB_CH9120_H_ */
