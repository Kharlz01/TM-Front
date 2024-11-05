/// <reference types="vite/client" />

interface ImportMetaEmv {
    readonly VITE_BACK_URL: string;
}

interface ImportMeta {
    env: ImportMetaEmv;
}