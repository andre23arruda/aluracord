import Head from 'next/head'
import Chat from '../src/views/Chat'

export default function Page() {
    return (
        <>
            <Head>
                <title>Chat | My discord</title>
            </Head>

            <Chat />
        </>
    )
}
