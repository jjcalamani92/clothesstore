import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { FC, useContext } from 'react';
import { Category, IClothing, ISeo, Item, Section } from "../../src/interfaces";
import { PBS, PRODUCT_BY_SLUG } from "../../src/gql/query";
import { ProductOverviews, HeadingPrimary } from "../../components/Components";
import { Layout } from "../../components/Layout";
import { graphQLClientP, graphQLClientS } from "../../src/graphQLClient";
import { SBI } from "../../src/gql/siteQuery";
import { UiContext } from "../../src/context";

interface SlugPage {
	product: IClothing
	seo: ISeo
}

const SlugPage: NextPage<SlugPage> = ({ product, seo }) => {
	const { site } = useContext(UiContext)
	return (
		<Layout
			title={`${site.title} - ${product.name}`}
			pageDescription={product.description}
			imageFullUrl={product.image[0]}
		>
			<HeadingPrimary seo={seo} productName={product.name} productSlug={product.slug} />
			<ProductOverviews product={product} />
		</Layout>
	);
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
	const { clothingAll } = await graphQLClientP.request(PBS , {site: `${process.env.API_SITE}`})

	const paths = clothingAll.map((data: IClothing) => ({
		params: { slug: data.slug }
	}));
	return {
		paths,
		fallback: "blocking"
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { slug = "" } = params as { slug: string };

	const { clothingBySlug } = await graphQLClientP.request(PRODUCT_BY_SLUG, {slug: `${slug}`, site: `${process.env.API_SITE}`})
		const { site } = await graphQLClientS.request(SBI, {id: process.env.API_SITE})
	const res = site.categories.find(findCategory)
	function findCategory(res:Category){
		return res.href === `${clothingBySlug.category}`;
	}
  const re = res.sections.find(findSection)
	function findSection(re:Section){
		return re.href === `${clothingBySlug.section}`;
	}
  const r = re.items.find(findItem)
	function findItem(r:Item){
		return r.href === `${clothingBySlug.item}`;
	}
	return {
		props: {
			product: clothingBySlug,
			seo: {
        category: {
          name: res.name,
          href: res.href
        },
        section: {
          name: re.name,
          href: re.href
        },
        item: {
          name: r.name,
          href: r.href
        }
      },

    },
    revalidate: 10
  }
};
export default SlugPage;

// import { GetStaticPaths, GetStaticProps, NextPage } from "next";
// import { useQuery } from "@apollo/client";
// import { IClothing } from "../../src/interfaces";
// import { client } from "../../src/apollo";
// import { Spinner01, ProductOverviews05 } from "../../components/Components";
// import { Layout } from "../../components/Layout";
// import Heading01 from "../../components/Components/Heading01";
// import { ISeo } from '../../src/interfaces/Site';

// interface SlugPage {
// 	slug: string;
// }

// const SlugPage: NextPage<SlugPage> = ({ slug }) => {
// 	const { loading, error, data } = useQuery(PRODUCT_BY_SLUG, {
// 		variables: { slug: `${slug}`, site: process.env.API_SITE }
// 	});
// 	if (loading) return <Spinner01 />;
// 	return (
// 		<Layout
// 			title={"- Detalles"}
// 			pageDescription={"Detalles de los productos"}
// 		>
//       <Heading01 category={`${data.clothingBySlug.category}`} section={`${data.clothingBySlug.section}`} item={`${data.clothingBySlug.item}`} name={`${data.clothingBySlug.name}`}/>
// 			<ProductOverviews05 product={data.clothingBySlug} />
// 		</Layout>
// 	);
// };


// export const getStaticPaths: GetStaticPaths = async (ctx) => {
// 	const { data } = await client.query({
// 	});
// 	const paths = data.hardwares.map((data: IClothing) => ({
// 		params: { slug: data.slug }
// 	}));
// 	return {
// 		paths,
// 		fallback: "blocking"
// 	};
// };
// export const getStaticProps: GetStaticProps = async ({ params }) => {
// 	const { slug = "" } = params as { slug: string };
// 	return {
// 		props: {
// 			slug
//     },
//     revalidate: 60 * 60 * 24
//   }
// };
// export default SlugPage;

