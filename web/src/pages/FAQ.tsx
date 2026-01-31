import React from 'react';

export default function FAQ() {
  return (
    <section className="section page-section" data-reveal>
      <div className="section-head">
        <h2>Frequently asked questions</h2>
        <p>Real problems, real solutions. Here's how Rep Rumble helps you succeed.</p>
      </div>

      <div className="accordion" data-stagger>
        <details className="accordion-item" open>
          <summary>I forget to track my meals. How can I stay consistent?</summary>
          <p>
            <strong>The Problem:</strong> Life gets busy and meal logging feels like a chore.<br /><br />
            <strong>Our Solution:</strong> Rep Rumble sends smart reminders based on your eating patterns.
            If you usually eat lunch at 1 PM, you'll get a gentle nudge at 1:15 PM.<br /><br />
            <strong>Example:</strong> Sarah used to forget 4 out of 7 days. After enabling meal reminders,
            she now logs consistently and lost 8 lbs in her first month.
          </p>
        </details>

        <details className="accordion-item">
          <summary>I hit a weight loss plateau. What should I do?</summary>
          <p>
            <strong>The Problem:</strong> You've been doing everything right but the scale won't budge.<br /><br />
            <strong>Our Solution:</strong> Our AI analyzes your data and suggests adjustments — maybe you need
            a refeed day, or your protein intake is too low for muscle retention.<br /><br />
            <strong>Example:</strong> Mike was stuck at 185 lbs for 3 weeks. Rep Rumble noticed his calories
            dropped too low, suggested increasing by 200 kcal, and he broke through within 10 days.
          </p>
        </details>

        <details className="accordion-item">
          <summary>I stress-eat at night. Can the app help with emotional eating?</summary>
          <p>
            <strong>The Problem:</strong> Late-night cravings and emotional eating derail your progress.<br /><br />
            <strong>Our Solution:</strong> Log your mood alongside meals. Rep Rumble identifies patterns —
            like stress on Mondays leading to overeating — and suggests healthier coping strategies.<br /><br />
            <strong>Example:</strong> Emma discovered she binged every Sunday night due to work anxiety.
            She now takes a 10-minute walk instead, reducing her weekly calorie surplus by 1,500 kcal.
          </p>
        </details>

        <details className="accordion-item">
          <summary>My sleep is terrible. Does that affect my fitness goals?</summary>
          <p>
            <strong>The Problem:</strong> Poor sleep increases hunger hormones and kills workout performance.<br /><br />
            <strong>Our Solution:</strong> Sync your wearable to track sleep. Rep Rumble adjusts your daily
            targets based on sleep quality — lighter workouts on bad sleep days, higher protein to prevent muscle loss.<br /><br />
            <strong>Example:</strong> After syncing his Apple Watch, Tom realized his 5-hour sleep nights
            correlated with 40% more snacking. He now prioritizes 7 hours and feels stronger in the gym.
          </p>
        </details>

        <details className="accordion-item">
          <summary>I don't know what to eat for my goals. Can I get meal suggestions?</summary>
          <p>
            <strong>The Problem:</strong> Counting macros is confusing and meal planning takes hours.<br /><br />
            <strong>Our Solution:</strong> Tell us your goal (lose fat, build muscle, maintain). Rep Rumble
            generates personalized meal ideas that fit your macros, preferences, and what's in your fridge.<br /><br />
            <strong>Example:</strong> Lisa wanted high-protein vegetarian meals. The app suggested a Greek
            yogurt parfait for breakfast (32g protein) and chickpea curry for dinner — hitting her 120g goal easily.
          </p>
        </details>

        <details className="accordion-item">
          <summary>I travel often for work. How do I stay on track?</summary>
          <p>
            <strong>The Problem:</strong> Hotel gyms are limited, restaurant menus are unpredictable.<br /><br />
            <strong>Our Solution:</strong> Enable "Travel Mode" to get bodyweight workout alternatives and
            restaurant macro estimates. Scan any menu and get smart ordering suggestions.<br /><br />
            <strong>Example:</strong> James travels 3 weeks a month. Using Travel Mode, he maintained his
            physique by doing hotel room HIIT and choosing grilled options at restaurants.
          </p>
        </details>

        <details className="accordion-item">
          <summary>Can my doctor see my health data?</summary>
          <p>
            <strong>The Problem:</strong> Doctors need accurate data but handwritten food diaries are incomplete.<br /><br />
            <strong>Our Solution:</strong> Export detailed PDF reports showing weight trends, nutrition averages,
            workout frequency, and sleep patterns — everything your healthcare provider needs.<br /><br />
            <strong>Example:</strong> When David's nutritionist saw his 90-day report, she identified a Vitamin D
            deficiency pattern and adjusted his supplement stack immediately.
          </p>
        </details>

        <details className="accordion-item">
          <summary>I want to build muscle but keep gaining fat. What's wrong?</summary>
          <p>
            <strong>The Problem:</strong> Bulking often leads to excessive fat gain if not done correctly.<br /><br />
            <strong>Our Solution:</strong> Rep Rumble calculates your lean bulk surplus (usually 200-300 kcal above maintenance)
            and tracks your weight gain rate. If you're gaining too fast, it alerts you to dial back.<br /><br />
            <strong>Example:</strong> Alex was eating 500 kcal surplus and gaining 2 lbs/week (too fast).
            The app suggested reducing to 250 kcal surplus — he now gains 0.5 lb/week with minimal fat.
          </p>
        </details>

        <details className="accordion-item">
          <summary>Does it work with my Apple Watch / Fitbit / Garmin?</summary>
          <p>
            <strong>The Problem:</strong> You already own a wearable but your data is scattered across apps.<br /><br />
            <strong>Our Solution:</strong> Rep Rumble syncs with Apple Health, Google Fit, Fitbit, Garmin,
            and WHOOP. All your steps, heart rate, sleep, and workouts flow into one dashboard.<br /><br />
            <strong>Example:</strong> Maria connected her Garmin and Fitbit scale. Now her morning weight,
            daily steps, and evening run all appear in one place — no more app switching.
          </p>
        </details>

        <details className="accordion-item">
          <summary>Is there a free trial? What if it doesn't work for me?</summary>
          <p>
            <strong>The Problem:</strong> You don't want to pay for something that might not fit your lifestyle.<br /><br />
            <strong>Our Solution:</strong> Start with our free tier — unlimited food logging, basic reports,
            and community access. Upgrade only when you want AI coaching, advanced analytics, or wearable sync.<br /><br />
            <strong>Example:</strong> Try it for 2 weeks free. If Rep Rumble isn't right for you, cancel anytime
            with one click — no questions asked, no hidden fees.
          </p>
        </details>
      </div>
    </section>
  );
}
