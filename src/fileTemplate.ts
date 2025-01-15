import { ChallengeDetails } from './types/challengeDetails';

export function getReadmeTemplate(challenge: ChallengeDetails): string {
  const currentDate = new Date().toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `# ${challenge?.name}

## 🏅 Rank
**${challenge?.rank?.name}** (${challenge?.rank?.color})

## 🗂️ Catégorie
**${challenge.category}**

## 🏷️ Tags
- ${challenge?.tags?.join('\n- ')}

---

## 💻 Langages Disponibles
- ${challenge?.languages?.join('\n- ')}

---

## 📜 Description du Kata

${challenge?.description}

---

## 🔗 Liens
- [Voir le Kata sur Codewars](${challenge?.url})
- **Auteur** : [${challenge?.createdBy?.username}](${challenge?.createdBy?.url})
- **Approuvé par** : [${challenge?.approvedBy?.username}](${challenge?.approvedBy?.url})

---

## 📈 Statistiques
- **Total de tentatives** : ${challenge?.totalAttempts}
- **Total de solutions validées** : ${challenge?.totalCompleted}
- **Nombre d'étoiles** : ⭐ ${challenge?.totalStars}
- **Score des votes** : 👍 ${challenge?.voteScore}
- **Suggestions non résolues** : ${challenge?.unresolved?.suggestions ?? 0}
- **Problèmes non résolus** : ${challenge?.unresolved?.issues ?? 0}

---

## ℹ️ Note Générale
Les informations contenues dans ce fichier (statistiques, tags, langages, etc.) sont celles disponibles au moment de la génération du README (${currentDate}). Elles peuvent évoluer avec le temps.
`;
}