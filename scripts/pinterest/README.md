# TileFlow UK — Pinterest API scripts

Three tiny CLI scripts for managing @tileflowuk from the command line.

## One-time: upgrade the trial token to full scopes

The token Pinterest hands you from the developer dashboard is READ-ONLY. To post pins you need `pins:write` and `boards:write`, which only come from a proper OAuth flow.

```bash
# In the Pinterest dev dashboard (Settings → Link to Pinterest → your app):
#   1. Add redirect URI: http://localhost:8787/callback
#   2. Save.

cd ~/Desktop/tileflowuk-v2
node scripts/pinterest/oauth.mjs
# Browser opens → click Allow → tokens are written to .env.local.
```

After this, `PINTEREST_ACCESS_TOKEN` in `.env.local` is a full read+write token.

## List boards (get board IDs for posting)

```bash
node scripts/pinterest/list-boards.mjs
```

Prints something like:
```
  987654321  Small Bathroom Ideas UK
  987654322  Tile Drenching Inspiration
```

Copy the ID you want to pin to.

## Post a pin

```bash
node scripts/pinterest/post-pin.mjs \
  --board 987654321 \
  --title "How to tile a bathroom floor in 8 steps" \
  --description "UK DIY bathroom tiling guide — real tiler's tips. Full method, tool list, price ranges." \
  --link https://tileflowuk.com/blog/how-to-tile-a-bathroom-floor \
  --image https://tileflowuk.com/pin-studio/blog/how-to-tile-a-bathroom-floor
```

The `--image` URL must be public. `/pin-studio/{section}/{slug}` returns a 1000×1500 branded pin generated from the article's MDX frontmatter.

## Rate limits

- Trial access: 1000 requests / day
- Standard access (after 2–5 days of activity): unlimited

Batch posting: `post-pin.mjs` does one pin per invocation. For 30 pins, run it 30 times with a 3-second pause:

```bash
for i in 1 2 3; do
  node scripts/pinterest/post-pin.mjs --board XXX --title "..." --link ... --image ...
  sleep 3
done
```
