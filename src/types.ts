declare global {
    // https://yandex.ru/support/metrica/code/counter-initialize.html
    interface YaMetrika2Options {
        // Точный показатель отказов, значение по умолчанию - true
        accurateTrackBounce?: boolean | number;
        // Признак записи содержимого iframe без счетчика в дочернем окне. Значение по умолчанию - false
        childIframe?: boolean;
        // Признак сбора данных для карты кликов. Значение по умолчанию - false
        clickmap?: boolean;
        // Признак отключения автоматической отправки данных при инициализации счетчика. Значение по умолчанию - false
        defer?: boolean;
        // Сбор данных электронной коммерции. Значение по умолчанию - false
        ecommerce?: string | boolean | string[];
        // Параметры визита, передаваемые во время инициализации счетчика.
        params?: any;
        // Параметры посетителей сайта, передаваемые во время инициализации счетчика.
        userParams?: any;
        // Признак отслеживания изменений хеша в адресной строке браузера. Значение по умолчанию - false
        trackHash?: boolean;
        // Признак отслеживания переходов по внешним ссылкам
        trackLinks?: boolean;
        // Признак доверенного домена для записи содержимого дочернего окна iframe. 
        trustedDomains?: string[];
        // Тип счетчика. Для РСЯ равен 1. Значение по умолчанию - 0
        type?: 0 | 1;
        // Признак использования Вебвизора. Значение по умолчанию - false
        webvisor?: boolean;
        // Признак проверки готовности счетчика. Значение по умолчанию - false
        triggerEvent?: boolean;
        // Запись заголовка страницы. Значение по умолчанию - true
        sendTitle?: boolean;
    }

    interface YaMetrika2 extends Record<string, (...args: any) => void> {
        hit(url?: string, options?: YaMetrika2HitOptions): void;
        params(params: any): void;
        reachGoal(target: string, params?: any, callback?: () => void, ctx?: any): void;
        addFileExtension(extension: string | string[]): void;
        extLink(url: string, options?: YaMetrika2ExtLinkOptions): void;
        file(url: string, options?: YaMetrika2FileOptions): void;
        firstPartyParams(params: YaMetrika2FirstPartyParamsParams): void;
        firstPartyParamsHashed(params: YaMetrika2FirstPartyParamsHashedParams): void;
        getClientID(): string;
        setUserID(userId: string): void;
        notBounce(options?: YaMetrika2NotBounceOptions): void;
        userParams(params: any): void;
        destruct(): void;
    }

    interface YaMetrika2ExtLinkOptions {
        // Callback-функция, вызываемая после отправки данных о загрузке файла
        callback?: () => void;
        // Контекст, доступный в callback-функции по ключевому слову this
        ctx?: any;
        // Параметры визита
        params?: any;
        // Заголовок текущей страницы
        title?: string;
    }

    interface YaMetrika2FileOptions {
        // Callback-функция, вызываемая после отправки данных о загрузке файла
        callback?: () => void;
        // Контекст, доступный в callback-функции по ключевому слову this
        ctx?: any;
        // Параметры визита
        params?: any;
        // URL с которого посетитель загрузил файл
        referer?: string;
        // Заголовок текущей страницы
        title?: string;
    }

    interface YaMetrika2FirstPartyParamsParams {
        // Электронный адрес.
        email?: string;
        // Номер телефона без пробелов в формате 70123456789.
        phone_number?: string;
        // Имя посетителя.
        first_name?: string;
        // Фамилия посетителя.
        last_name?: string;
        // Уникальный идентификатор пользователя Яндекса (id). Передавайте, если на вашем сайте есть авторизация Яндекс ID.
        yandex_cid?: string | number;
    }

    interface YaMetrika2FirstPartyParamsHashedParams {
        // Электронный адрес.
        email?: string;
        // Номер телефона без пробелов в формате 70123456789.
        phone_number?: string;
        // Имя посетителя.
        first_name?: string;
        // Фамилия посетителя.
        last_name?: string;
        // Уникальный идентификатор пользователя Яндекса (id). Передавайте, если на вашем сайте есть авторизация Яндекс ID.
        yandex_cid?: string | number;
    }

    interface YaMetrika2NotBounceOptions {
        // Callback-функция, вызываемая после отправки данных о просмотре
        callback?: () => void;
        // Контекст, доступный в callback-функции по ключевому слову this
        ctx?: any;
    }

    interface YaMetrika2HitOptions {
        // Callback-функция, вызываемая после отправки данных о загрузке файла
        callback?: () => void;
        // Контекст, доступный в callback-функции по ключевому слову this
        ctx?: any;
        // Параметры визита
        params?: any;
        // URL с которого посетитель загрузил файл
        referer?: string;
        // Заголовок текущей страницы
        title?: string;   
    }

    interface Window {
        [key: `yaCounter${string}`]: YaMetrika2;

        // https://yandex.ru/support/metrica/objects/method-reference.html

        // ym(XXXXXX, 'init', { clickmap: false });
        ym(id: number, methodName: 'init', options?: YaMetrika2Options): void;

        // ym(XXXXXX, 'addFileExtension' 'lzh');
        ym(id: number, methodName: 'addFileExtension', extension: string | string[]): void;

        // ym(XXXXXX, 'extLink', 'https://yandex.com');
        ym(id: number, methodName: 'extLink', url: string, options?: YaMetrika2ExtLinkOptions): void;

        // ym(XXXXXX, 'file', url[, options]);
        ym(id: number, methodName: 'file', url: string,  options?: YaMetrika2FileOptions): void;

        // ym(XXXXXX, 'firstPartyParams', parameters);
        ym(id: number, methodName: 'firstPartyParams', params: YaMetrika2FirstPartyParamsParams): void;

        // ym(XXXXXX, 'notBounce', [options]);
        ym(id: number, methodName: 'notBounce', options?: YaMetrika2NotBounceOptions): void;

        // ym(XXXXXX, 'getClientID', function(clientID) { }); 
        ym(id: number, methodName: 'getClientID', callback: (clientID: string) => void): void;

        // ym(XXXXXX, 'setUserID', "12345");
        ym(id: number, methodName: 'setUserID', userId: string): void;

        // ym(XXXXXX, 'hit', [url[, options]])
        ym(id: number, methodName: 'hit', url?: string, options?: YaMetrika2HitOptions): void;

        // ym(XXXXXX, 'params', parameters);
        ym(id: number, methodName: 'params', params: YaMetrika2Params): void;

        // ym(XXXXXX, 'reachGoal', target[, params[, callback[, ctx]]]);
        ym(
            id: number,
            methodName: 'reachGoal',
            target: string,
            params?: any,
            callback?: () => void,
            ctx?: any
        ): void;

        // ym(XXXXXX, 'userParams', parameters);
        ym(id: number, methodName: 'userParams', params: any): void;

        Ya: {
            Metrika2: {
                new (id: string | number | YaMetrika2Options & { id: number }): YaMetrika2;
                counters(): Array<{ id: number; type: number; clickmap: boolean; webvisor: boolean; trackHash: boolean; }>;
                informer(id: number): void;
            }
        }
    }
}

export {};
