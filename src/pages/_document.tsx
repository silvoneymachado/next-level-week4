import Document, {Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render(){
        return(
            <Html>
                <Head key='static'>
                    <link rel="shortcut icon" href="favicon.png" type="image/png"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@600&family=Rajdhani:wght@600&display=swap" rel="stylesheet"/>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <footer style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <div>Some icons are madded by <a href="https://www.flaticon.com/authors/kiranshastry" title="Kiranshastry" target='_blank'>Kiranshastry</a> from <a href="https://www.flaticon.com/" title="Flaticon" target='_blank' >www.flaticon.com</a></div>
                    </footer>
                </body>
            </Html>
        )
    }
}