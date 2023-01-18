import { expose } from 'comlink';
import sodium from 'libsodium-wrappers';

export const CryptoService = {
    getHash: async (data: string) => {
        await sodium.ready;
        const hash = sodium.crypto_hash(data, 'base64');
        return hash;
    },

    generateIdAndKey: async () => {
        await sodium.ready;
        const id = sodium.randombytes_buf(8, 'base64');
        const key = sodium.crypto_kdf_keygen('base64');
        return { id, key };
    },

    encrypt: async (key: string, data: string) => {
        await sodium.ready;

        const nonce = sodium.randombytes_buf(
            sodium.crypto_secretbox_NONCEBYTES
        );

        const encryptedData = sodium.crypto_secretbox_easy(
            data,
            nonce,
            sodium.from_base64(key),
            'base64'
        );

        return { encryptedData, nonce: sodium.to_base64(nonce) };
    },

    decrypt: async (key: string, nonce: string, encryptedData: string) => {
        await sodium.ready;

        const decryptedData = sodium.crypto_secretbox_open_easy(
            sodium.from_base64(encryptedData),
            sodium.from_base64(nonce),
            sodium.from_base64(key)
        );

        return sodium.to_string(decryptedData);
    },
};

expose(CryptoService);
