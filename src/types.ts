declare global {
    type YaMetrika2Params = Record<string, unknown> | Array<Record<string, unknown>>;
    type YaMetrika2UserParams = Record<string, unknown>;

    // https://yandex.ru/support/metrica/ru/code/counter-initialize
    interface YaMetrika2Options {
        // Точный показатель отказов, значение по умолчанию - true
        accurateTrackBounce?: boolean | number;
        // Признак записи содержимого iframe без счетчика в дочернем окне. Значение по умолчанию - false
        childIframe?: boolean;
        // Признак сбора данных для карты кликов. Значение по умолчанию - true
        clickmap?: boolean;
        // Признак отключения автоматической отправки данных при инициализации счетчика. Значение по умолчанию - false
        defer?: boolean;
        // Признак работы Яндекс Тег Менеджера. Значение по умолчанию - false
        disableYtm?: boolean;
        // Сбор данных электронной коммерции. Значение по умолчанию - false
        ecommerce?: string | boolean | unknown[];
        // Параметры визита, передаваемые во время инициализации счетчика.
        params?: YaMetrika2Params;
        // Параметры посетителей сайта, передаваемые во время инициализации счетчика.
        userParams?: YaMetrika2UserParams;
        // Признак отслеживания изменений хеша в адресной строке браузера. Значение по умолчанию - false
        trackHash?: boolean;
        // Признак отслеживания переходов по внешним ссылкам. Значение по умолчанию - true
        trackLinks?: boolean;
        // Признак доверенного домена для записи содержимого дочернего окна iframe.
        trustedDomains?: string[];
        // Тип счетчика. Для РСЯ равен 1. Значение по умолчанию - 0
        type?: number;
        // Признак использования Вебвизора. Значение по умолчанию - false
        webvisor?: boolean;
        // Признак проверки готовности счетчика. Значение по умолчанию - false
        triggerEvent?: boolean;
        // Запись заголовка страницы. Значение по умолчанию - true
        sendTitle?: boolean;
        // Технический параметр для работы кода вставки. Значение по умолчанию - true
        ssr?: boolean;
    }

    interface YaMetrika2 extends Record<string, (...args: any) => void> {
        hit(url?: string, options?: YaMetrika2HitOptions): void;
        params(params: YaMetrika2Params): void;
        reachGoal(target: string, params?: Record<string, unknown>, callback?: () => void, ctx?: unknown): void;
        addFileExtension(extension: string | string[]): void;
        extLink(url: string, options?: YaMetrika2ExtLinkOptions): void;
        file(url: string, options?: YaMetrika2FileOptions): void;
        firstPartyParams(params: YaMetrika2FirstPartyParamsParams): void;
        firstPartyParamsHashed(params: YaMetrika2FirstPartyParamsHashedParams): void;
        getClientID(): string;
        setUserID(userId: string): void;
        notBounce(options?: YaMetrika2NotBounceOptions): void;
        userParams(params: YaMetrika2UserParams): void;
        destruct(): void;
    }

    interface YaMetrika2ExtLinkOptions {
        // Callback-функция, вызываемая после отправки данных о загрузке файла
        callback?: () => void;
        // Контекст, доступный в callback-функции по ключевому слову this
        ctx?: unknown;
        // Параметры визита
        params?: Record<string, unknown>;
        // Заголовок текущей страницы
        title?: string;
    }

    interface YaMetrika2FileOptions {
        // Callback-функция, вызываемая после отправки данных о загрузке файла
        callback?: () => void;
        // Контекст, доступный в callback-функции по ключевому слову this
        ctx?: unknown;
        // Параметры визита
        params?: Record<string, unknown>;
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
        ctx?: unknown;
    }

    interface YaMetrika2HitOptions {
        // Callback-функция, вызываемая после отправки данных о загрузке файла
        callback?: () => void;
        // Контекст, доступный в callback-функции по ключевому слову this
        ctx?: unknown;
        // Параметры визита
        params?: Record<string, unknown>;
        // URL с которого посетитель загрузил файл
        referer?: string;
        // Заголовок текущей страницы
        title?: string;
    }

    interface Window {
        [key: `yaCounter${string}`]: YaMetrika2 | undefined;
        Ya?: {
            Metrika2: {
                new (id: string | number): YaMetrika2;
                new (options: YaMetrika2Options & { id: number }): YaMetrika2;
                counters(): Array<{ id: number; type: number; clickmap: boolean; webvisor: boolean; trackHash: boolean; }>;
                informer(id: number): void;
            }
        }
    }
}

export {};
