react-metrika
=============
[![NPM version](https://img.shields.io/npm/v/react-metrika.svg)](https://www.npmjs.com/package/react-metrika)
[![NPM Downloads](https://img.shields.io/npm/dm/react-metrika.svg?style=flat)](https://www.npmjs.org/package/react-metrika)
[![install size](https://packagephobia.com/badge?p=react-metrika)](https://packagephobia.com/result?p=react-metrika)

Превосходный React/Preact-компонент для работы с Яндекс Метрикой и не только.

<img width="350" src="https://raw.githubusercontent.com/hcodes/react-metrika/refs/heads/main/images/react-metrika.png" />

# Преимущества

- скрипт Яндекс Метрики загружается один раз на странице для нескольких счётчиков, это позволяет избавиться от лишних сетевых запросов, сэкономить трафик и избежать лишнего парсинга и выполнения JS-кода скрипта Метрики;
- компонент `<MetrikaCounter />` можно размещать в любом месте на странице, гарантируется что счётчик не будет несколько раз инициализироваться;
- если возникают ошибки загрузки скрипта Метрики, он пытается заново загрузиться;
- пока скрипт Метрики не загрузился, все вызванные методы счётчика Метрики с данными буферизируются и отправляются после успешной загрузки скрипта Метрики;
- TypeScript-тайпинги на счётчик Метрики;
- поддержка SSR;
- компактный код.

# Установка
```
npm install react-metrika
```

# Использование
Установка одного счётчика:
```jsx
import { MetrikaCounter } from 'react-metrika';

export const MyPage = () => {
    return (
        <>
            <Header />
            <Content>Some text...</Content>
            <Footer />
            <MetrikaCounter
                id={1234567}
                options={{
                    trackHash: true,
                    webvisor: true
                }}
            />
        </>
    );
}
```

Установка нескольких счётчиков с одинаковыми настройками:
```jsx
import { MetrikaCounters, ym } from 'react-metrika';

export const MyPage = () => {
    const handleClick = () => {
        ym(1234567, 'params', { myParams: { a: 1, b: 2, c: 3 } });
    };

    return (
        <>
            <Header />
            <Content>
                Some text...
                <button onClick={handleClick}>Click me!</button>
            </Content>
            <Footer />
            <MetrikaCounters
                ids={[1234567, 2345678]}
                options={{
                    trackHash: true
                }}
            />
        </>
    );
}
```

## Использование без React
```js
import { ym } from 'react-metrika';

// counterId, method, value
ym(1234567, 'init', { webvisor: true });

// ...

ym(1234567, 'reachGoal', 'goalName', { a: 1, b: 2, c: 3 });

```

## Предварительная загрузка скрипта Метрики
В некоторых случаях необходимо максимально быстро загрузить скрипт Метрики, например, в начальной точке инициализации приложения или до отображения интерфейса.

`loadMetrikaScript()` — клиентская функция: она использует DOM и не предназначена для выполнения в серверном коде или во время SSR. Вызывайте её только в браузере, например в клиентской точке входа или `useEffect`.

```js
import { loadMetrikaScript } from 'react-metrika';

loadMetrikaScript().then(() => {
    console.log('Metrika script is loaded.');
});

// ...
```

Также можно добавить в `<head>` страницы предзагрузку скрипта Метрики:
```html
<link rel="preload" href="https://mc.yandex.ru/metrika/tag.js" as="script" />
```

## Загрузка скрипта Метрики с международного домена

```js
import { setMetrikaScriptUrl, METRIKA_SCRIPT_URL_COM } from 'react-metrika';

// https://mc.yandex.com/metrika/tag.js
setMetrikaScriptUrl(METRIKA_SCRIPT_URL_COM);

// ...
```

```jsx
import { MetrikaCounters, METRIKA_SCRIPT_URL_COM } from 'react-metrika';

export const MyPage = () => {
    return (
        <>
            <Header />
            <Content>
            </Content>
            <Footer />
            <MetrikaCounters
                ids={[1234567, 2345678]}
                scriptUrl={METRIKA_SCRIPT_URL_COM}
            />
        </>
    );
}
```

## SPA-приложения и Next.js
Опция `trackHash` отслеживает только изменения хеша. Она подходит для приложений с hash-маршрутизацией:
```jsx
<MetrikaCounter
    id={1234567}
    options={{
        trackHash: true
    }}
/>
```

Для приложений, которые используют History API, включая Next.js, Яндекс рекомендует отключить автоматическую отправку просмотра с помощью `defer: true`:

```jsx
<MetrikaCounter
    id={1234567}
    options={{
        defer: true
    }}
/>
```

При такой настройке вызывайте `hit` после первого отображения страницы и при каждой смене маршрута. В Next.js этот вызов нужно выполнять на клиенте после изменения текущего URL. Передавайте актуальный URL из используемого роутера в свойство `url`:

```jsx
import { useEffect, useRef } from 'react';
import { ym } from 'react-metrika';

export const MetrikaHit = ({ url }) => {
    const previousUrlRef = useRef();

    useEffect(() => {
        if (previousUrlRef.current === url) {
            return;
        }

        ym(1234567, 'hit', url, {
            referer: previousUrlRef.current || document.referrer
        });

        previousUrlRef.current = url;
    }, [url]);

    return null;
};
```

# Ссылки
- [Справка Метрики: Инициализация счётчика](https://yandex.ru/support/metrica/ru/code/counter-initialize)
- [Справка Метрики: Справочник методов](https://yandex.ru/support/metrica/ru/objects/method-reference)
- [Справка Метрики: Отладчик работы счётчика](https://yandex.ru/support/metrica/ru/general/debugger)

# [Лицензия](./LICENSE)
