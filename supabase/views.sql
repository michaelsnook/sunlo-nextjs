CREATE OR REPLACE VIEW

  public.user_card_review_plus 

 WITH (security_invoker=on)

  AS (
    SELECT
      r.id,
      r.created_at,
      r.card_id,
      r.score,
      d.lang
    FROM
      public.user_card_review AS r
      JOIN public.user_card AS c ON (r.card_id = c.id)
      JOIN public.user_deck AS d ON (c.user_deck_id = d.id)
  );
