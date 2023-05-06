import React from "react";
import { Dimensions, ImageSourcePropType } from "react-native";
import { Box, VStack, Heading, Image, useColorModeValue } from 'native-base';

const Hero = ({ title, image, day, hero, children }) => {
    return (
        <VStack h="300px" pb={5}>
            <Image
                position="absolute"
                left={0}
                right={0}
                bottom={0}
                w="full"
                h="300px"
                resizeMode="cover"
                source={image}
                backgroundColor={"#1273eb"}
                alt=""
            />
            <Heading
                color={useColorModeValue("#fff", "warmGray.50")}
                size="lg"
                position={"absolute"}
                left={Dimensions.get('window').width * 0.85}
                right={Dimensions.get('window').width * 0.2}
                bottom={Dimensions.get('window').width * -0.01}
                w="full"
                fontSize={20}
                fontWeight={300}
            >
                {`${day.toString().slice(8, 10)}\n`}
                {`${day.toString().slice(4, 7)}\n`}
                {`${day.toString().slice(11)}\n`}
            </Heading>
            <Image
                position={"absolute"}
                left={Dimensions.get('window').width * 0.8}
                right={0}
                bottom={0}
                w={Dimensions.get('window').width * 0.2}
                h={Dimensions.get('window').width * 0.3}
                resizeMode="cover"
                source={image}
                alt=""
                backgroundColor={useColorModeValue("#c7ebff", "#c7ebff")}
                borderLeftRadius={Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2}
                opacity={0.2}
            />
            {children}
            <Box flex={1} />
            <Heading color={useColorModeValue("#fff", "#fff")} p={6} pt={0} size={"xl"} opacity={1}>
                {title}
            </Heading>
            <Image
                position={"absolute"}
                left={Dimensions.get('window').width * 0}
                right={0}
                bottom={0}
                w={Dimensions.get('window').width * 0.8}
                h={Dimensions.get('window').width * 0.1}
                resizeMode="cover"
                source={image}
                alt=""
                backgroundColor={useColorModeValue("#c7ebff", "#c7ebff")}
                borderRightRadius={Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2}
                opacity={0.2}
            />
        </VStack>
    )
}

export default Hero;