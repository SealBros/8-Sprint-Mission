import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import LikeDisplay from "../ui/LikeDisplay";
import Link from "next/link";
import { Article, ArticleListResponse } from "@/DTO/articleTypes";

import MedalIcon from "@/public/images/icons/ic_medal.svg";
import useViewport from "../hooks/useViewport";
import Image from "next/image";

const BestArticleCard = ({ article }: { article: Article }) => {
  const dateString = format(new Date(article.createdAt), "yyyy. MM. dd");

  return (
    <Link href={`/boards/${article.id}`} className="bg-gray-50 rounded-lg">
      <div className="flex items-center bg-blue-500 rounded-b-2xl text-white font-semibold text-lg gap-1 p-2 ml-6">
        <MedalIcon alt="베스트 게시글" />
        Best
      </div>
      <div className="p-4">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold">{article.title}</h2>
          {article.image && (
            <div className="relative w-full h-48">
              <Image
                fill
                src={article.image}
                alt={`${article.id}번 게시글 이미지`}
                style={{ objectFit: "contain" }}
              />
            </div>
          )}
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center">
            {article.writer.nickname}
            <LikeDisplay count={article.likeCount} fontSize={14} />
          </div>
          <span className="text-gray-500">{dateString}</span>
        </div>
      </div>
    </Link>
  );
};

const BestArticlesSection = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [pageSize, setPageSize] = useState<number | null>(null);
  const viewport = useViewport();
  const viewportWidth = viewport.width;

  const getPageSize = (width: number): number => {
    if (width < 768) return 1; // Mobile
    if (width < 1280) return 2; // Tablet
    return 3; // Desktop
  };

  useEffect(() => {
    if (viewportWidth === 0) return;

    const newPageSize = getPageSize(viewportWidth);
    if (newPageSize !== pageSize) {
      setPageSize(newPageSize);
    }
  }, [viewportWidth, pageSize]);

  useEffect(() => {
    const fetchBestArticles = async (size: number) => {
      try {
        const response = await axios.get<ArticleListResponse>(
          `https://panda-market-api.vercel.app/articles?orderBy=like&pageSize=${size}`
        );
        setArticles(response.data.list);
      } catch (error) {
        console.error("Failed to fetch best articles:", error);
      }
    };

    if (pageSize !== null) {
      fetchBestArticles(pageSize);
    }
  }, [pageSize]);

  return (
    <div>
      <header className="mb-4">
        <h1 className="text-2xl font-bold">베스트 게시글</h1>
      </header>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <BestArticleCard key={`best-article-${article.id}`} article={article} />
        ))}
      </div>
    </div>
  );
};

export default BestArticlesSection;