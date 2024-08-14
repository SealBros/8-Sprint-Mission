import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { format } from "date-fns";
import SearchBar from "@/components/ui/SearchBar";
import DropdownMenu from "@/components/ui/DropdownMenu";
import LikeCountDisplay from "@/components/ui/LikeCountDisplay";
import EmptyState from "@/components/ui/EmptyState";

const ArticleItem = ({ article }) => {
  const dateString = format(article.createdAt, "yyyy. MM. dd");

  return (
    <div className="flex flex-col mb-6">
      <Link href={`/boards/${article.id}`} className="block p-4 border rounded-lg hover:shadow-lg transition">
        <div className="mb-2">
          <h2 className="text-lg font-semibold">{article.title}</h2>
          {article.image && (
            <div className="relative w-full h-48">
              <img
                src={article.image}
                alt={`${article.id}번 게시글 이미지`}
                className="object-contain w-full h-full"
              />
            </div>
          )}
        </div>
        <div className="flex justify-between items-center text-gray-600 text-sm">
          <span>{article.writer.nickname} <span className="ml-2">{dateString}</span></span>
          <LikeCountDisplay count={article.likeCount} iconWidth={24} gap={2} />
        </div>
      </Link>
      <hr className="my-6" />
    </div>
  );
};

const AllArticlesSection = ({ initialArticles }) => {
  const [orderBy, setOrderBy] = useState("recent");
  const [articles, setArticles] = useState(initialArticles);
  const router = useRouter();
  const keyword = (router.query.q as string) || "";

  const handleSortSelection = (sortOption) => {
    setOrderBy(sortOption);
  };

  const handleSearch = (searchKeyword) => {
    const query = { ...router.query };
    if (searchKeyword.trim()) {
      query.q = searchKeyword;
    } else {
      delete query.q;
    }
    router.replace({
      pathname: router.pathname,
      query,
    });
  };

  useEffect(() => {
    const fetchArticles = async () => {
      let url = `https://panda-market-api.vercel.app/articles?orderBy=${orderBy}`;
      if (keyword.trim()) {
        url += `&keyword=${encodeURIComponent(keyword)}`;
      }
      const response = await axios.get(url);
      setArticles(response.data.list);
    };

    fetchArticles();
  }, [orderBy, keyword]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">게시글</h1>
        <Link href="/addArticle" className="text-blue-500 hover:underline">글쓰기</Link>
      </div>

      <div className="flex justify-between mb-4">
        <SearchBar onSearch={handleSearch} />
        <DropdownMenu
          onSortSelection={handleSortSelection}
          sortOptions={[
            { key: "recent", label: "최신순" },
            { key: "like", label: "인기순" },
          ]}
        />
      </div>

      {articles.length ? (
        articles.map((article) => (
          <ArticleItem key={`article-${article.id}`} article={article} />
        ))
      ) : (
        keyword && <EmptyState text={`'${keyword}'로 검색된 결과가 없어요.`} />
      )}
    </div>
  );
};

export default AllArticlesSection;
