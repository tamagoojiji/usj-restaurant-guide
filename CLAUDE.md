# CLAUDE.md（usj-restaurant-guide）

## デプロイ
- GitHub Pages（clasp不要）。`git push` でデプロイ
- **公開URL**: https://tamagoojiji.github.io/usj-restaurant-guide/

## データ更新フロー
1. Obsidian（`~/USJ-Knowledge/USJ/レストラン/`）のmdファイルを更新
2. `data.js` のRESTAURANTS配列を対応するレストランのデータに反映
3. `git add . && git commit && git push` でデプロイ
4. Discord `#data-update-reminder` に更新完了を通知

## 対象レストラン（14施設）
※ 食べ歩きフード・クローズ済み店舗は対象外

## 自動完結ルール（~/CLAUDE.md 参照）
コード修正 → 2ファイル以上変更なら `/codex-review`、1ファイルなら自分でレビュー → エラー・指摘あれば修正 → 指摘0でユーザーに報告。途中でユーザーに投げない。
