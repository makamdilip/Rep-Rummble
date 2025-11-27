# 🤖 AI Food Recognition Setup Guide

This guide will help you set up the AI-powered food recognition feature in Rep Rumble.

## Quick Start (No Setup Required!)

**Good news!** The app works perfectly fine without any AI setup. It uses intelligent mock data that simulates the AI experience:

- ✅ Upload or take photos of food
- ✅ See realistic nutrition analysis
- ✅ Track calories, carbs, protein, and fat
- ✅ Full app functionality

**No API key needed for testing and demo purposes!**

---

## Enable Real AI Recognition (Optional)

Want to use actual AI to analyze your food photos? Follow these steps:

### Step 1: Get Your Free API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the generated API key

**Note**: Google Gemini offers a free tier that's perfect for personal use!

### Step 2: Configure the App

1. In your project root, create a `.env` file:
   ```bash
   cp .env.example .env
   ```

2. Open the `.env` file and add your API key:
   ```bash
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

3. Restart the development server:
   ```bash
   npm run dev
   ```

### Step 3: Test the AI

1. Open the app at `http://localhost:5173`
2. Login (use demo or your email)
3. Go to the **"AI Food Scanner"** tab
4. Take a photo or upload an image of food
5. Watch the AI analyze it in real-time!

---

## How It Works

### With API Key (Real AI)
```
Your Food Photo → Google Gemini AI → Nutrition Analysis
```

The AI will:
- Identify the food items
- Calculate calories, carbs, protein, fat, fiber
- Provide confidence score
- Estimate serving size

### Without API Key (Mock Data)
```
Your Food Photo → Smart Mock System → Realistic Nutrition Data
```

The app will:
- Show realistic nutrition values
- Simulate AI processing
- Provide varied results
- Maintain full functionality

---

## Features Powered by AI

### 🍽️ Food Recognition
- Identifies multiple food items in one photo
- Works with various cuisines
- Recognizes home-cooked and restaurant meals

### 📊 Nutrition Calculation
- Automatic calorie counting
- Macronutrient breakdown (carbs, protein, fat)
- Fiber content analysis
- Serving size estimation

### 🎯 Confidence Scoring
- Shows AI confidence percentage
- Higher scores = more accurate analysis
- Typical scores: 85-95%

---

## Tips for Best Results

### Taking Food Photos

1. **Good Lighting**: Take photos in well-lit areas
2. **Clear View**: Capture the entire meal from above
3. **Focus**: Make sure the food is in focus
4. **Single Plate**: Best results with one plate/bowl per photo
5. **No Filters**: Use original photos without filters

### What Works Well ✅

- Home-cooked meals
- Restaurant dishes
- Bowls and plates
- Standard cuisines (Indian, Chinese, Western, etc.)
- Whole foods and complete meals

### What May Be Challenging ⚠️

- Very dark or blurry photos
- Mixed/complex dishes with many ingredients
- Unusual or rare foods
- Partially eaten meals
- Foods covered or obscured

---

## API Usage & Limits

### Google Gemini Free Tier

- **Requests per minute**: 60
- **Requests per day**: 1,500
- **Cost**: FREE

This is more than enough for personal use!

### Monitoring Usage

You can track your API usage at:
[Google AI Studio - API Keys](https://makersuite.google.com/app/apikey)

---

## Troubleshooting

### "AI not working" or "Using mock data"

**Check these:**
1. Is your `.env` file in the project root?
2. Is the variable named exactly `VITE_GEMINI_API_KEY`?
3. Did you restart the dev server after adding the key?
4. Is your API key valid? (Check AI Studio)

### "Invalid API key" error

**Solutions:**
1. Verify the key is copied correctly (no extra spaces)
2. Check if the key is active in AI Studio
3. Ensure you have the Gemini API enabled

### Slow AI response

**Tips:**
- Smaller image files load faster
- Compress images before upload
- Check your internet connection
- Free tier has rate limits

---

## Privacy & Security

### Your Data
- ❌ No data is stored on external servers
- ✅ Images analyzed in real-time only
- ✅ Results saved locally in your browser
- ✅ API calls go directly to Google

### API Key Security
- ✅ Never commit `.env` file to git
- ✅ The `.env` file is in `.gitignore`
- ⚠️ Don't share your API key publicly
- ⚠️ Regenerate key if compromised

---

## Advanced Configuration

### Customize AI Behavior

Edit `src/services/aiVisionService.ts` to:

- Change the AI model (gemini-1.5-flash, gemini-1.5-pro)
- Adjust the prompt for different analysis styles
- Modify nutrition calculation logic
- Add custom food databases

### Example: Using Gemini Pro

```typescript
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })
```

---

## Support & Resources

### Official Documentation
- [Google Gemini AI Docs](https://ai.google.dev/docs)
- [API Reference](https://ai.google.dev/api)

### Need Help?
- Open an issue on GitHub
- Check the README.md
- Review the code comments

---

## Cost Comparison

| Feature | Without AI | With AI |
|---------|-----------|---------|
| Food logging | ✅ Mock data | ✅ Real AI |
| Nutrition tracking | ✅ | ✅ |
| Image upload | ✅ | ✅ |
| Accuracy | Simulated | Real analysis |
| Setup required | None | 2 minutes |
| Cost | FREE | FREE |

---

**Happy tracking! 🍽️💪✨**

Remember: The app is fully functional without AI setup. Add the API key only when you're ready to use real AI food recognition!
