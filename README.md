react-metrika
=============
[![NPM version](https://img.shields.io/npm/v/react-metrika.svg)](https://www.npmjs.com/package/react-metrika)
[![NPM Downloads](https://img.shields.io/npm/dm/react-metrika.svg?style=flat)](https://www.npmjs.org/package/react-metrika)
[![install size](https://packagephobia.com/badge?p=react-metrika)](https://packagephobia.com/result?p=react-metrika)

React/Preact-компонент для работы с Яндекс Метрикой.

# Преимущества
- скрипт Яндекс Метрики загружается один раз на странице для нескольких счётчиков;
- компонент `<MetrikaCounter />` можно размещать в любом месте на странице, счётчики Яндекс Метрики инициализируется один раз на странице;
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
import { YaMetrikaCounter } from 'react-metrika';

export const MyPage: FC = () => {
    return (
      <Header>Some header</Header>
      <Content>Some text...</Content>
      <Footer></Footer>
      <YaMetrikaCounter
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
import { YaMetrikaCounter } from 'react-metrika';

export function MyPage() {
    const handleClick = () => {
        ym(123, 'params', { myParams: { a: 1, b: 2, c: 3 } });
    };

    return (
        <Header>Some header</Header>
        <Content>
            Some text...
            <button onClick={handleClick}>Click me!</button>
        </Content>
        <Footer></Footer>
        <YaMetrikaCounters
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

В некоторых случаях необходимо максимально быстро загрузить скрипт Метрики, например, до отображения интерфейса.

```js
import { loadMetrikaScript } from 'react-metrika';

loadMetrikaScript();

// ...
```

## Загрузка скрипта Метрики с международного домена

```js
import { setMetrikaUrl, METRIKA_SCRIPT_URL_COM } from 'react-metrika';

setMetrikaScriptUrl(METRIKA_SCRIPT_URL_COM);

// ...

```

# [Лицензия](./LICENSE)
