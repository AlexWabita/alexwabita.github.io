
declare interface BlogAPIType {
	static getAllArticles: Function;

	static getFeaturedArticles: Function;

	static getArticleBySlug: Function;

	static getArticlesByCategory: {	};

	static getPopularArticles: Function;

	static getRecentArticles: Function;

	static getAllCategories: Function;

	static incrementViews: Function;

	static toggleLike: Function;
}
