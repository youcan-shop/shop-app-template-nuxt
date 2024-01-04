import crypto from "node:crypto";

const ALG = "aes-256-ecb";

export function encrypt(subject: string) {
  const { youcan_api_secret } = useRuntimeConfig();

  const cipher = crypto.createCipheriv(ALG, sha256(youcan_api_secret), null);

  let encrypted = cipher.update(subject, "utf8", "hex");
  encrypted += cipher.final("hex");

  return encrypted;
}

export function decrypt(crypt: string) {
  const { youcan_api_secret } = useRuntimeConfig();

  const decipher = crypto.createDecipheriv(
    ALG,
    sha256(youcan_api_secret),
    null
  );

  let decrypted = decipher.update(crypt, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}

export function sha256(str: string): Buffer {
  return crypto.createHash("sha256").update(str).digest();
}
