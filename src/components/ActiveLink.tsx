import Link, { LinkProps } from "next/link";
import { useRouter } from "next/dist/client/router";
import { cloneElement, ReactElement } from "react";

interface ActiveLinkProps extends LinkProps {
    children: ReactElement;
    shouldMatchExactRef?: boolean;
}

export function ActiveLink({ 
    children, 
    shouldMatchExactRef = false, 
    ...rest 
}: ActiveLinkProps) {
    const { asPath } = useRouter();
    let isActive = false;

    if (shouldMatchExactRef && (asPath === rest.href || asPath === rest.as)) {
        isActive = false;
    }

    if (!shouldMatchExactRef && (
        asPath.startsWith(String(rest.href)) ||
        asPath.startsWith(String(rest.as)))) {
           isActive = true;
    }

    return (
        <Link {...rest}>
            {cloneElement(children, {
                color: isActive ? 'pink.400' : 'gray.50',
            })}
        </Link>
    )
}