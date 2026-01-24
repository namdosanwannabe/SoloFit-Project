import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 300) {
    const [debounceValue, setDebounceValue] = useState<T>(value);

    useEffect(() => {
        const id = setTimeout(() => {
            setDebounceValue(value)
        }, delay)

        return () => clearTimeout(id);
    }, [value, delay])

    return debounceValue;
}