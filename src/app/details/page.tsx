"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./details.module.css";

type Repository = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  forks_count: number;
  open_issues_count: number;
  stargazers_count: number;
};

export default function Details() {
  const [repo, setRepo] = useState<Repository | null>(null);
  const searchParams = useSearchParams();
  const search = searchParams.get("id");
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://api.github.com/repositories/${search}`
      );
      const data = await response.json();
      console.log(data);
      setRepo(data);
    }

    fetchData();
  }, []);

  if (!repo) {
    return <div>Loading...</div>;
  }

  return (
    <main className={styles.main}>
        <h1>Detalhes do repositorio</h1>
      <div className={styles.repoWrapper}>
        <h1>{repo.name}</h1>
        <h3>{repo.description}</h3>
        <br/>
        <h2>Estatisticas:</h2>
        <h3>Numeros de Fork: {repo.forks_count}</h3>
        <h3>Issues abertas: {repo.open_issues_count}</h3>
        <h3>Estrelas recebidas: {repo.stargazers_count}</h3>
        {/* exibir mais informações do repositório aqui */}
        <button className={styles.btnBack} type="button" onClick={() => router.back()}>
        &#x2190; Voltar
        </button>
      </div>
    </main>
  );
}
