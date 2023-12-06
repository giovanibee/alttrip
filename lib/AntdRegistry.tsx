'use client';

import React from 'react';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import type Entity from '@ant-design/cssinjs/es/Cache';
import { useServerInsertedHTML } from 'next/navigation';

import { Layout } from 'antd'
import MainHeader from '@/components/Homepage/Header'
import { Footer, Main } from '@/components/BaseComponents'

export function StyledComponentsRegistry ({ children }: React.PropsWithChildren) {
  const cache = React.useMemo<Entity>(() => createCache(), [])
  const isServerInserted = React.useRef<boolean>(false)
  useServerInsertedHTML(() => {
    // avoid duplicate css insert
    if (isServerInserted.current) return
    isServerInserted.current = true
    return <style id="antd" dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }} />
  });
  return (
    <StyleProvider cache={cache}>
      <Layout>
        <MainHeader />
        <Main>
          {children}
        </Main>
          <Footer>
            <div
              style={{
                color: 'grey',
                display: 'block',
                margin: '0px 56px 28px auto',
              }}
            >
              ⊛ hello.alttrip@gmail.com ⊛ made with love from las vegas,
              nv, usa © 2023
            </div>
          </Footer>
        </Layout>
    </StyleProvider>
  );
}