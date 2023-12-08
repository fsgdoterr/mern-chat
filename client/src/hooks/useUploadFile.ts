import { useEffect, useRef, useState } from "react"
import { IMAGE_MIMETYPES } from "../utils/const";

interface Options {
    maxSize?: number;
    allowedMimetypes?: IMAGE_MIMETYPES[],
}


export const useUploadFile = (
    callback: (e: ProgressEvent<FileReader>) => void,
    options?: Options,
    errorCallback?: () => void,
) => {

    const ref = useRef<HTMLInputElement | null>(null);
    const refTimeout = useRef<NodeJS.Timeout | null>(null);

    const timeoutCallback = () => {
        if(!ref.current) refTimeout.current = setTimeout(timeoutCallback, 250);


        if(ref.current) {
            const input = ref.current;

            const listener = (e: Event) => {
                const files = input.files;
                const reader = new FileReader();

                reader.onload = callback;

                if(files?.length) {
                    if(options) {
                        if(options.maxSize && files[0].size > options.maxSize) {
                            if(errorCallback) errorCallback();
                            return;
                        }
                        if(options.allowedMimetypes?.length && !options.allowedMimetypes.includes(files[0].type as IMAGE_MIMETYPES)) {
                            if(errorCallback) errorCallback();
                            return;
                        }
                    }

                    reader.readAsDataURL(files[0]);
                }
            }

            input.addEventListener('change', listener);
        }

    }

    useEffect(() => {
        refTimeout.current = setTimeout(timeoutCallback, 500);
    }, []);

    return ref;
}