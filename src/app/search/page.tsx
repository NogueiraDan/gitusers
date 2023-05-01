"use client";
import React, { useState } from "react";
import styles from "./search.module.css";
import Link from "next/link";



type Repository = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  forks_count: number;
  open_issues: number;
  stargazers_count: number;
};

export default function Search() {
  const [user, setUser] = useState<string>("");
  const [repositories, setRepositories] = useState<Repository[]>([]);


  async function handleSearch() {
    const response = await fetch(`https://api.github.com/users/${user}/repos`);
    const data = await response.json();
    console.log(data);
    setRepositories(data);
    setUser("");

    if (!response) {
      alert("ERRO");
      return;
    }
  }

  return (
    <main className={styles.main}>
      <Link href={"/"} className={styles.backHome}>
        &#127968;
      </Link>
      <h1>Encontre um Dev</h1>
      <div className={styles.searchWrapper}>
        <h2 style={{ marginBottom: "15px" }}>
          Pesquise por um dev, e veja seus repositorios
        </h2>
        <input
          className={styles.input}
          type="text"
          placeholder="Digite o nome..."
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <button onClick={handleSearch} className={styles.btnSearch}>
          Pesquisar
        </button>

        <div className={styles.reposWrapper}>
          {repositories.length > 0 &&
            repositories.map((repo: Repository) => (
              <div key={repo.id} className={styles.repos}>
                <h3>{repo.name}</h3>
                <p>{repo.description}</p>
                <Link href={{pathname: "/details", query:{id: repo.id}}}>Ver detalhes</Link>
              </div>
            ))}

          {repositories.length === 0 && <div></div>}
        </div>
      </div>
    </main>
  );
}
