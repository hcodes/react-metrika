react-metrika
=============
[![NPM version](https://img.shields.io/npm/v/react-metrika.svg)](https://www.npmjs.com/package/react-metrika)
[![NPM Downloads](https://img.shields.io/npm/dm/react-metrika.svg?style=flat)](https://www.npmjs.org/package/react-metrika)
[![install size](https://packagephobia.com/badge?p=react-metrika)](https://packagephobia.com/result?p=react-metrika)

Превосходный React/Preact-компонент для работы с Яндекс Метрикой и не только.

# Преимущества
- скрипт Яндекс Метрики загружается один раз на странице для нескольких счётчиков, это позволяет избавится от лишних сетевых запросов, сэкономить трафик и избежать лишнего парсинга и выполнения JS-кода скрипта Метрики (73 КБ GZIP);
- компонент `<MetrikaCounter />` можно размещать в любом месте на странице, гарантируется что счётчик не будет несколько раз инициализироваться;
- если возникают ошибки загрузки скрипта Метрики, он пытается заново загрузиться;
- пока скрипт Метрики не загрузился, все вызванные методы счётчика Метрики с данными буферизируются и отправляются после успешной загрузки скрипта Метрики;
- поддержка SSR;
- компактный код.

# Установка
```
npm install --save-dev react-metrika
```

# Использование
Установка одного счётчика:
```jsx
import { FC } from 'react';
import { MetrikaCounter } from 'react-metrika';

export const MyPage: FC = () => {
    return (
      <Header />
      <Content>Some text...</Content>
      <Footer />
      <MetrikaCounter
          id="1234567"
          options={{
              trackLinks: true,
              trackHash: true,
              clickmap: true,
              webvisor: true
          }}
      />
  );
}
```

Установка нескольких счётчиков с одинаковыми настройками:
```jsx
import { FC } from 'react';
import { MetrikaCounters } from 'react-metrika';

export function MyPage() {
    const handleClick = () => {
        ym(123, 'params', { myParams: { a: 1, b: 2, c: 3 } });
    };

    return (
        <Header />
        <Content>
            Some text...
            <button onClick={handleClick}>Click me!</button>
        </Content>
        <Footer />
        <MetrikaCounters
            ids={[123, 234]}
            options={{
                trackLinks: true,
                trackHash: true,
                clickmap: true,
                webvisor: true
            }}
        />
  );
}
```

## Использование без React
```js
import { ym } from 'react-metrika';

// counterId, method, value
ym(123, 'init', { clickmap: true, trackLinks: true });

// ...

ym(123, 'reachGoal', 'goalName', { params: { a: 1, b: 2, c: 3 }});

```

## Предварительная загрузка скрипта Метрики
В некоторых случаях необходимо максимально быстро загрузить скрипт Метрики, например, в начальной точке инициализации приложения или до отображения интерфейса.

```js
import { loadMetrikaScript } from 'react-metrika';

loadMetrikaScript();

// ...
```

## Загрузка скрипта Метрики с международного домена

```js
import { setMetrikaUrl, METRIKA_SCRIPT_URL_COM } from 'react-metrika';

// https://mc.yandex.com/metrika/tag.js
setMetrikaScriptUrl(METRIKA_SCRIPT_URL_COM);

// ...
```

## SPA-приложения и Next.js
Для отслеживания изменения урла страницы не забудьте включить опцию счётчика `trackHash: true`.
```jsx
<MetrikaCounter
    id="1234567"
    options={{
        trackHash: true, // !!!
        trackLinks: true,
        clickmap: true,
        webvisor: true
    }}
/>
```

# Ссылки
- [Справка Метрики: Инициалищия счётчика](https://yandex.ru/support/metrica/code/counter-initialize.html)
- [Справка Метрики: Справочник методов](https://yandex.ru/support/metrica/objects/method-reference.html)
- [Справка Метрики: Отладчик работы](https://yandex.ru/support/metrica/general/debugger.html)

# [Лицензия](./LICENSE)
