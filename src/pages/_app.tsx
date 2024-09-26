import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/system";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Head from "next/head";
import Layout from "@/components/Layout";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Ayurbhavan</title>
        <meta name="description" content="Welcome to my Ayurbhavan" />
        <meta
          name="keywords"
          content="Botanical name, medic, medicinal plants, plants"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <NextUIProvider>
            <main className="">
              <Component {...pageProps} />
            </main>
          </NextUIProvider>
        </Layout>
      </QueryClientProvider>
    </>
  );
}
