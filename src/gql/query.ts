import { gql } from "@apollo/client";

export const PBS = gql`
	query ClothingAll($site: String!) {
		clothingAll(site: $site) {
			slug
		}
	}
`;
export const PRODUCTS = gql`
	query ClothingAll($site: String!) {
		clothingAll(site: $site) {
			name
			image
			price
			description
			category
			section
			item
			slug
		}
	}
`;

export const CATEGORY = gql`
	query ClothingAll($site: String!) {
		clothingAll(site: $site) {
			category
		}
	}
`;
export const SECTION = gql`
	query ClothingAll($site: String!) {
		clothingAll(site: $site) {
			category
			section
		}
	}
`;
export const ITEM = gql`
	query ClothingAll($site: String!) {
		clothingAll(site: $site) {
			category
			section
			item
		}
	}
`;


export const PRODUCTS_BY_ITEM = gql`
	query ClothingByCategoryAndSectionAndItem($category: String!, $section: String!, $item: String!, $site: String!) {
		clothingByCategoryAndSectionAndItem(category: $category, section: $section, item: $item, site: $site) {
			name
			price
			image
			slug
		}
	}
`;
export const PRODUCTS_BY_SECTION = gql`
	query ClothingByCategoryAndSectionAndItem($category: String!, $section: String!, $item: String!, $site: String!) {
		clothingByCategoryAndSectionAndItem(category: $category, section: $section, item: $item, site: $site) {
			name
			price
			image
			slug
		}
	}
`;

export const PRODUCT_BY_SLUG = gql`
	query ClothingBySlug($slug: String!, $site: String!) {
		clothingBySlug(slug: $slug, site: $site) {
			_id
			name
			brand
			description
			image
			inStock
			slug
			category
			section
			item
			price
			oldPrice
			tags

			sizes
		}
	}
`;


export const PRODUCT_ALL = gql`
	query ClothingsAll($limit: Float!, $offset:Float!, $site: String!) {
		clothingsAll(input:  { limit: $limit, offset: $offset}, site:$site ) {
			_id
			name
			brand
			description
			image
			inStock
			slug
			category
			section
			item
			price
			tags
			
			sizes
		}

}
`
