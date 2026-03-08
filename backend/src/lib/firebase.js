import admin from 'firebase-admin';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const serviceAccount = require('./serviceAccountKey.json');

try {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log("Firebase Admin SDK initialized successfully.");
  }
} catch (error) {
  console.error("Firebase Admin SDK initialization error:", error);
}

export default admin;


// serviceAccountKey.json

// {
//   "type": "service_account",
//   "project_id": "devfund-a1717",
//   "private_key_id": "5bade2626c1d2220af7d3b22dfc8c52d80feb8a5",
//   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC5EIHfqdS5d3Ce\nnXluIO3l/YFunywt3PKVx3q+l99SzuN2CkNoxWZ0rgJQG8CXUYK03/8mHihNs0N3\nrL9qZ+aNRK+fW3W3JN35M66EmeWi8GXB9lfmm2YHYuw+b8b1NB0Bsacmx4cqLauG\nrKlAaljiXjpSqCjq7srfd8jzLiG8q5LtOMh4RNfWGIZ8XwmCrdLT+dxBdNve5fFs\nQwYRACf72a0wd+s+gnitWjh0ibZU096EA8IjrgaF33HbsxKey3KSJHlRYo+/hkt7\nLn5iShuqccxWG5PEfpzSwBrmvbYS0Pmrk/vnr/96WsY3sfUBYZ4EwWqbIqGp4W31\nZ05MXqo7AgMBAAECggEAVhxiug5dj7EOY5e1nXNQDvCu7ai911dUPzJTIGUtgmwG\n9fFfnVwgyNEA/YJ0UlSYo44IvJVSvpjXn1Nvu9S9t+UKbPWTKBVM/fw4y7WKXw9J\n4f88tm5/gpdagtDi/Exz5Mpjkw1LjOo0QlWL6Y+ybR5YOAbMB0j2eBXWGKVSCGXo\nYYDutD5EYdG6Ie6ff1oMn+LNysmrXD4w0o22fwkZ4HrZ8ZQi11LXC5tBL7PvCiHn\nT4g+hl1vzxabqnM63Bx6OLrLH6WavDlZ+ZMh8j8SiO9Y265P89k6iyWPe0Yz8c+g\npwATazcsM8ikur/TvZJxOD0pTH4UgvgN3myWQrvZUQKBgQDnyg8n1ZnhBqgoJd5Z\ndJVwK+l/L5jFVobwIQO+U3QMnBoyrKyl0T8x4T39Fm6PxerNymA6UUg4eF9UCeE8\nPZPtqhlj+/m9LRHIhmjQPuMAhUj/hM2yuZW/fP3EYWqDTNCQZiB/qNYaY5eSCpNu\npCv62FGFNcHcLZod+9PjDRoeywKBgQDMZQw8KK5TQlCKGGP04Z5OXc6TMgrHjtFp\nNXdXYeC0IdVPb8rZEboUMWWo/lXb1HnHL5VRQgepkn56Mn0Mye7HPMgn4OtMRnRx\nVfOIhpSjTp1aakNZxfkRWNSwMnYF4Zys3Lnvvaoi/DxZ8AqPzhliy5tBdlMCAz93\n+zNd0idEUQKBgQDXKp4ZB1MaLhjJdCXM+smCYHEXzPJPNfx7Stpzwnp2/i3fnqWC\nJBU603G80CcANeS69kOPv0aAjVVI6Qb56du5gu6g/xadAwqAEC2aKtaE9DWIZRqh\n719Qa9ISi6/ZhOQTN4qxluRxiMP6IPEtgx8Ec+xw8S8tmfN4I/5UxiPaMwKBgQDI\nIaDrPsICUApgTSWCX3AMN5nPUs5vO44cP/fMnc/RUNd2YnXyOYNDxmJOKEqVZuSe\nfh7sY4TxKrmgmNMMtKSSfRdWxMpf8xSM7KX6ZhwgExfLsgSkYE5SB/KpW59oftJU\nCAQflEyE2QmW3ozY5erBa69nV55LeDarGlHfaah9IQKBgHRsZrkA86Xfoc4oFWQR\nHkE04ffIGFcHBxlM78wa5WekCnVQa2pQCgt0Ld6r8FiuixLjT1krpHP1d/dHOf1B\nZb7ef4yLNB2jcCxCjvLgCDMQJt3IKwcKOGloVDHI9/RCp7rhVGRIbg+kwsWGATl5\nSc8y4IRTEsHyKcHamjGQtvJK\n-----END PRIVATE KEY-----\n",
//   "client_email": "firebase-adminsdk-fbsvc@devfund-a1717.iam.gserviceaccount.com",
//   "client_id": "114991720873770488313",
//   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//   "token_uri": "https://oauth2.googleapis.com/token",
//   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40devfund-a1717.iam.gserviceaccount.com",
//   "universe_domain": "googleapis.com"
// }
