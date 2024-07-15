### SingleAxios

这是一个axios单例实例，主要用于自动取消请求发送，当有相同的url请求时，自动取消之前的请求。

#### 源代码

```typescript
import type { CancelTokenSource, AxiosRequestConfig, AxiosInstance } from 'axios';
import axios from 'axios';

const config: AxiosRequestConfig = {
    baseURL: '',
    // timeout: 50, // Timeout
    // withCredentials: true,
};
const _axios: AxiosInstance = axios.create(config);


class SingleAxiosImpl {
    private url: Record<string, CancelTokenSource>;

    constructor() {
        this.url = {};
        window.addEventListener('popstate', () => {
            this.cancelAllRequest();
        });
        window.addEventListener('replaceState', () => {
            this.cancelAllRequest();
        });
        window.addEventListener('pushState', () => {
            this.cancelAllRequest();
        });
    }

    setSource(_url: string) {
        if(Reflect.has(this.url, _url)) {
            this.cancelRequest(_url);
        }
        const cancelToken = axios.CancelToken.source();
        this.url[_url] = cancelToken;
    }

    // 代理所有的axios方法
    request(config: any): any {
        this.setSource(config.url);
        return _axios.request(config);
    }
    get(...args: any[]): any {
        this.setSource(args[0]);
        return _axios.get(...args);
    }
    post(...args: any[]): any {
        this.setSource(args[0]);
        return _axios.post(...args);
    }
    put(...args: any[]): any {
        this.setSource(args[0]);
        return _axios.put(...args);
    }
    delete(...args: any[]): any {
        this.setSource(args[0]);
        return _axios.delete(...args);
    }
    head(...args: any[]): any {
        this.setSource(args[0]);
        return _axios.head(...args);
    }
    options(...args: any[]): any {
        this.setSource(args[0]);
        return _axios.options(...args);
    }
    patch(...args: any[]): any {
        this.setSource(args[0]);
        return _axios.patch(...args);
    }

    // 取消请求
    public cancelRequest(_url): void {
        this.url[_url]?.cancel(`取消请求：${_url}`);
        this.removeUrl(_url);
    }

    public cancelAllRequest(): void {
        for (const key in this.url) {
            this.cancelRequest(key);
            this.removeUrl(key);
        }
    }

    public removeUrl(_url?: string): void {
        _url && Reflect.deleteProperty(this.url, _url);
    }
}
const singleAxios = new SingleAxiosImpl();

// 请求拦截器
_axios.interceptors.request.use(
    config => {
        config.cancelToken = singleAxios.url[config.url!]?.token;
        return config;
    },
    error => {
        return Promise.reject(error);
    },
);
// 响应拦截器
_axios.interceptors.response.use(
    response => {
        singleAxios.removeUrl(response.config?.url);
        return response;
    },
    error => {
        singleAxios.removeUrl(error.config?.url);
        if (axios.isCancel(error)) {
            console.log(error.message);
        } else {
            // 处理错误
        }
        return Promise.reject(error);
    },
);

export default singleAxios;

```