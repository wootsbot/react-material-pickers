import React from 'react';

import Head from 'next/head';
import App from 'next/app';


import 'material-pickers-calendar/dist/Calendar.css';
import 'material-pickers-daterange/dist/DateRangePicker.css';

class Srr extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <title>React example</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <Component {...pageProps} />

        <style global jsx>{`
          body {
            margin: 0;
            padding: 0;
            font-size: 16px;
            font-family: Inter;
          }
        `}</style>
      </>
    );
  }
}

export default Srr;