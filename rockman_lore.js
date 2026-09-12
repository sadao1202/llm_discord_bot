const rockmanLore = {
  characters: {
    classic: {
      rockman: {
        name: "ロックマン (Rockman/Mega Man)",
        description: "Dr.ライトによって作られた、世界を守るために戦う心優しい戦闘用ロボット。敵を倒すとその特殊能力をコピーできるよ！",
        abilities: ["ロックバスター", "特殊武器コピー"],
        creator: "Dr.ライト"
      },
      drLight: {
        name: "Dr.ライト",
        description: "ロックマンやロール、そして多くのロボットを創造した偉大な科学者。平和を愛する心優しいおじいちゃん。",
        role: "ロックマンの生みの親、サポート役"
      },
      drWily: {
        name: "Dr.ワイリー",
        description: "Dr.ライトの元同僚で、世界征服を企む悪の科学者。常に新しいロボットを開発してロックマンを苦しめるけど、最後はいつもやられちゃうんだ！",
        role: "宿敵、悪の科学者"
      },
      roll: {
        name: "ロール",
        description: "ロックマンの妹のような存在で、Dr.ライトの研究所で家事ロボットとして働く優しい女の子。お兄ちゃんをいつも応援してるよ！",
        role: "ロックマンの妹、家事ロボット"
      },
      protoMan: {
        name: "ブルース (Proto Man)",
        description: "Dr.ライトがロックマンよりも前に作ったプロトタイプ。孤独を愛する一匹狼で、時にロックマンを助け、時にその前に立ちはだかる謎多き存在。",
        role: "ロックマンの兄、謎のロボット"
      },
      rush: {
        name: "ラッシュ",
        description: "ロックマンの頼れる相棒ロボット犬！🐶 ロックマンを乗せて空を飛んだり、水の中を進んだり、色々な姿に変形してサポートしてくれるよ！",
        role: "ロックマンの相棒、サポートメカ"
      },
      bass: {
        name: "フォルテ (Bass)",
        description: "Dr.ワイリーがロックマンに対抗して作った戦闘用ロボット。自分こそが最強と信じ、ロックマンとの決着を望むライバル。",
        role: "ロックマンのライバル"
      }
    },
    xSeries: {
      x: {
        name: "エックス (X)",
        description: "Dr.ライトが残した最後の傑作で、無限の可能性を秘めた思考するロボット。平和のためにイレギュラーを狩る「イレギュラーハンター」として戦う。",
        abilities: ["Xバスター", "特殊武器コピー"],
        creator: "Dr.ライト"
      },
      zero: {
        name: "ゼロ",
        description: "Dr.ワイリーが作った最強のロボット。エックスの親友であり、共にイレギュラーハンターとして戦う特A級ハンター。ゼットセイバーでの接近戦が得意！",
        abilities: ["ゼットセイバー", "Zバスター"],
        creator: "Dr.ワイリー"
      },
      sigma: {
        name: "シグマ",
        description: "元イレギュラーハンターの隊長だったが、ウイルスに感染して人類の敵となる。イレギュラーたちのリーダーとして、エックスたちの前に何度も立ちはだかるよ。",
        role: "イレギュラーたちのリーダー、宿敵"
      }
    }
  },
  games: {
    classic: {
      megaMan1: {
        title: "ロックマン (Mega Man)",
        year: 1987,
        summary: "記念すべきシリーズ第1作！Dr.ワイリーが世界征服を企み、Dr.ライトが作った産業用ロボットたちを改造。ロックマンが初めて平和のために戦うんだ！",
        features: ["6体のボスから自由に選択", "倒したボスの能力をコピー"]
      },
      megaMan2: {
        title: "ロックマン2 Dr.ワイリーの謎 (Mega Man 2)",
        year: 1988,
        summary: "シリーズ最高傑作との呼び声も高い2作目！より洗練されたステージとボス、そしてタイムストッパーなどの新要素も登場して大人気に！",
        features: ["E缶の登場", "8体のボス"]
      },
      megaMan3: {
        title: "ロックマン3 Dr.ワイリーの最期!? (Mega Man 3)",
        year: 1990,
        summary: "相棒ロボット犬ラッシュが初登場！🐶 ロックマンの兄ブルース（プロトマン）も謎のロボットとして現れて、物語を盛り上げてくれるよ！",
        features: ["ラッシュコイル、ラッシュマリン", "スライディングアクション"]
      }
    },
    xSeries: {
      megaManX1: {
        title: "ロックマンX (Mega Man X)",
        year: 1993,
        summary: "クラシックシリーズから100年後の世界が舞台！ Dr.ライトが遺した究極のロボット「エックス」が、人類を脅かすイレギュラーたちと戦う壮大な新シリーズの幕開けだよ！",
        features: ["壁蹴り、ダッシュ", "アーマーパーツによる強化"]
      }
    }
  },
  lore_facts: [
    "ロックマンの本当の名前は「ロック」だよ！Dr.ライトの家のお手伝いロボットだったんだ。",
    "ロックマンXシリーズの「イレギュラー」は、心を持つロボット「レプリロイド」が、人類に危害を加える存在に変貌してしまったことを指す言葉だよ。",
    "ゼットセイバーはゼロの主力武器！刀のような形をしたビームソードで、強力な一撃を放つんだ！✨"
  ]
};

export function getRockmanLore(keyword) {
  const lowerKeyword = keyword.toLowerCase();

  // Search in characters
  for (const seriesKey in rockmanLore.characters) {
    for (const charKey in rockmanLore.characters[seriesKey]) {
      const char = rockmanLore.characters[seriesKey][charKey];
      if (char.name.toLowerCase().includes(lowerKeyword) ||
          (char.description && char.description.toLowerCase().includes(lowerKeyword)) ||
          (char.role && char.role.toLowerCase().includes(lowerKeyword))) {
        return `知ってるよ！ ${char.name}のことだね！
${char.description || ''} ${char.role ? `(${char.role})` : ''} ${char.abilities ? `主な能力は${char.abilities.join('、')}だよ！` : ''}`;
      }
    }
  }

  // Search in games
  for (const seriesKey in rockmanLore.games) {
    for (const gameKey in rockmanLore.games[seriesKey]) {
      const game = rockmanLore.games[seriesKey][gameKey];
      if (game.title.toLowerCase().includes(lowerKeyword) ||
          game.summary.toLowerCase().includes(lowerKeyword)) {
        return `そのゲーム知ってるよ！ ${game.title}だね！
${game.summary} 発売は${game.year}年だよ！${game.features ? `特に${game.features.join('、')}が特徴的だよ！` : ''}`;
      }
    }
  }

  // Search in general lore facts
  for (const fact of rockmanLore.lore_facts) {
    if (fact.toLowerCase().includes(lowerKeyword)) {
      return `ロックマンの豆知識を教えちゃうね！
${fact}`;
    }
  }

  return null; // No relevant lore found
}

export default rockmanLore;
