/*
*
* illisible
*
* A powerful and high-performance cross-runtime encryption software.
*
* @vinoskey524 • Hamet Kévin E. ODOUTAN • vinoskey524@gmail.com (Author)
*
*/

/* The "securs.ts" file may not be present for security reasons */
import { cipherFunc, decipherFunc, hasherFunc } from './secure';

/* ------------------------------- Types ------------------------------- */

type MAIN_TYPE = {
    init: (x: INIT_ARG_TYPE) => {
        encrypt: (x: ENCRYPT_ARG_TYPE) => ENCRYPT_RETURN_TYPE,
        decrypt: (x: DECRYPT_ARG_TYPE) => DECRYPT_RETURN_TYPE,
        hash: (x: HASH_ARG_TYPE) => HASH_RETURN_TYPE
    },
    generateKey: (x?: GEN_KEY_TYPE) => string
};

type INIT_ARG_TYPE = { key: string, runtime: RUNTIME_TYPE, algo?: CIPHER_ALGO_TYPE, };

type CIPHER_ALGO_TYPE = '128' | '256';

type GEN_KEY_TYPE = { algo: CIPHER_ALGO_TYPE };

type RUNTIME_TYPE = 'Web' | 'Node' | 'Bun' | 'Deno';

type ENCRYPT_ARG_TYPE = { data: string, algo?: CIPHER_ALGO_TYPE };
type ENCRYPT_RETURN_TYPE = Promise<FUNCTION_DEFAULT_RETURN_TYPE>;

type DECRYPT_ARG_TYPE = { data: string, algo?: CIPHER_ALGO_TYPE };
type DECRYPT_RETURN_TYPE = Promise<FUNCTION_DEFAULT_RETURN_TYPE>;

type HASH_ARG_TYPE = { data: string };
type HASH_RETURN_TYPE = Promise<FUNCTION_DEFAULT_RETURN_TYPE>;

type FUNCTION_DEFAULT_RETURN_TYPE = { ok: boolean, log: string, data: string | undefined };

/*
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
*/

/* ------------------------------- Data logistic ------------------------------- */

/* Store key */
const keyData: { current: string | undefined } = { current: undefined };

/* Store default algo */
const defaultAlgoData: { current: CIPHER_ALGO_TYPE } = { current: '128' };

/* Store runtime */
const runtimeData: { current: RUNTIME_TYPE } = { current: 'Web' };

/* 
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
*/

/* ------------------------------- Methods ------------------------------- */

/* Init */
const initFunc = (x: INIT_ARG_TYPE) => {
    if (!x)
        return;
    /* Set keys */
    if (typeof x.key === 'string' && isAlphanumFunc(x.key))
        keyData.current = x.key;
    /* Set default algo */
    if (x.algo)
        defaultAlgoData.current = x.algo;
    /* Set runtime */
    if (x.runtime)
        runtimeData.current = x.runtime;
};

/* Is alphanumeric */
const isAlphanumFunc = (x: string): boolean => {
    if (typeof x !== 'string')
        return false;
    return /^[a-zA-Z0-9]+$/.test(x);
};

/* Generate key */
const generateKeyFunc = (x?: GEN_KEY_TYPE): string => {
    const klen = ((x?.algo || defaultAlgoData.current) === '128') ? 32 : 64; /* Key length */
    let id = '';
    const val = '0aW9zXe8CrVt1By5NuA46iZ3oEpRmTlYkUjIhOgPfMdQsSqDwFxGcHvJbKnL';
    for (var i = 0; i < klen; i++)
        id += val.charAt(Math.floor(Math.random() * 36));
    return id;
};

/* Encrypt data */
const encryptDataFunc = async (x: ENCRYPT_ARG_TYPE): Promise<FUNCTION_DEFAULT_RETURN_TYPE> => {
    let res: FUNCTION_DEFAULT_RETURN_TYPE = { ok: true, log: '', data: undefined };
    try {
        const ciph = await cipherFunc({
            data: x.data,
            algo: x?.algo || defaultAlgoData.current,
            key: keyData.current!,
            runtime: runtimeData.current,
        });
        if (!ciph.ok)
            throw new Error(ciph.log);
        res.data = ciph.data;

    } catch (e: any) {
        res.ok = false;
        res.log = e.message
    }
    return res;
};

/* Decrypt data */
const decryptDataFunc = async (x: DECRYPT_ARG_TYPE): Promise<FUNCTION_DEFAULT_RETURN_TYPE> => {
    let res: FUNCTION_DEFAULT_RETURN_TYPE = { ok: true, log: '', data: undefined };
    try {
        const deciph = await decipherFunc({
            data: x.data,
            algo: x?.algo || defaultAlgoData.current,
            key: keyData.current!,
            runtime: runtimeData.current
        });
        if (!deciph.ok)
            throw new Error(deciph.log);
        res.data = deciph.data;

    } catch (e: any) {
        res.ok = false;
        res.log = e.message
    }
    return res;
};

/* Hash data */
const hashDataFunc = async (x: HASH_ARG_TYPE): Promise<FUNCTION_DEFAULT_RETURN_TYPE> => {
    let res: FUNCTION_DEFAULT_RETURN_TYPE = { ok: true, log: '', data: undefined };
    try {
        const hash = await hasherFunc({
            data: x.data,
            runtime: runtimeData.current
        });
        if (!hash.ok)
            throw new Error(hash.log);
        res.data = hash.data;

    } catch (e: any) {
        res.ok = false;
        res.log = e.message
    }
    return res;
};

/*
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
*/

/* ------------------------------- illisible ------------------------------- */

const illisible: MAIN_TYPE = {
    /* Init */
    init(x: INIT_ARG_TYPE) {
        /* Init "illisible" */
        initFunc(x);

        /* - */
        const next = {
            /* Encrypt */
            async encrypt(x: ENCRYPT_ARG_TYPE): ENCRYPT_RETURN_TYPE {
                return await encryptDataFunc(x);
            },

            /* Decrypt */
            async decrypt(x: DECRYPT_ARG_TYPE): DECRYPT_RETURN_TYPE {
                return await decryptDataFunc(x);
            },

            /* Hash */
            async hash(x: HASH_ARG_TYPE): HASH_RETURN_TYPE {
                return await hashDataFunc(x);
            }
        };
        return next;
    },

    /* Generate key */
    generateKey(x?: GEN_KEY_TYPE): string {
        return generateKeyFunc(x);
    }
};
export default illisible;