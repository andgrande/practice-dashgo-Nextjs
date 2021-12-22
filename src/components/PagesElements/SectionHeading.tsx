import { Heading, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";

interface SectionHeadingProps {
    children: string;
}

export function SectionHeading({ children }: SectionHeadingProps) {
    const color = useColorModeValue('gray.800', 'gray.50');

    return (
        <Heading size="lg" fontWeight="normal" color={color}>{children}</Heading>
    )
}