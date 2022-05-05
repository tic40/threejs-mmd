import Head from 'next/head'

const Meta = ({
  title,
  description,
}: {
  title: string
  description: string
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta property="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={process.env.ogImage} />
      <meta name="twitter:card" content="summary" />
      <link rel="icon" href={`${process.env.basePath}/favicon.ico`} />
    </Head>
  )
}

export default Meta
