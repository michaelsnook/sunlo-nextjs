CREATE OR REPLACE VIEW
  public.user_deck_plus

 WITH (security_invoker=on)

  AS (
    WITH first_step AS (SELECT
      d.id,
      d.uid,
      d.lang,
      d.created_at,
      COUNT(*) FILTER (WHERE c.status = 'learned') AS cards_learned,
      COUNT(*) FILTER (WHERE c.status = 'active') AS cards_active,
      COUNT(*) FILTER (WHERE c.status = 'skipped') AS cards_skipped,
      (SELECT COUNT(*) FROM public.phrase AS p WHERE p.lang = d.lang) AS lang_total_phrases,
      (SELECT MAX(updated_at) FROM public.user_card_review_plus AS r WHERE r.lang = d.lang LIMIT 1) AS most_recent_review_at
    FROM
      public.user_deck AS d
      JOIN public.user_card AS c ON (d.id = c.user_deck_id)
    GROUP BY d.id, d.lang, d.created_at
    )
    SELECT
      *,
      CASE
        WHEN most_recent_review_at > created_at
        THEN most_recent_review_at
        ELSE created_at
      END AS most_recent_activity_at
      FROM first_step
      ORDER BY most_recent_activity_at
  );
