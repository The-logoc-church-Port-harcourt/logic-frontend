
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { removeCookie } from '../../api/cookies';

export default function Forum() {
  const [currentUser, setCurrentUser] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [newQuestionTitle, setNewQuestionTitle] = useState('');
  const [newQuestionBody, setNewQuestionBody] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [showNewQuestionForm, setShowNewQuestionForm] = useState(false);
  const [loading, setLoading] = useState({ page: false, question: null, submitQuestion: false, submitAnswer: false });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(prev => ({ ...prev, page: true }));
      setError(null);
      
      try {
        // Fetch user profile
        const userProfile = await api.get('/user/profile');
        setCurrentUser(userProfile.data.user);
        
        // Fetch questions list
        const questionsResponse = await api.get('/questions');
        const questionsData = questionsResponse.data.questions || questionsResponse.data;
        // Normalize question IDs to use 'id' field
        const normalizedQuestions = questionsData.map(q => ({
          ...q,
          id: q.id || q._id
        }));
        setQuestions(normalizedQuestions);
      } catch (err) {
        console.error('Forum data fetch error:', err);
        setError(err.response?.data?.error || 'Failed to load forum data');
        // If unauthorized, redirect to login
        if (err.response?.status === 401) {
          removeCookie('token');
          navigate('/forum/login');
        }
      } finally {
        setLoading(prev => ({ ...prev, page: false }));
      }
    };
    
    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    removeCookie('token');
    localStorage.removeItem('currentUser');
    navigate('/forum/login');
  };

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    if (newQuestionTitle.trim()) {
      setLoading(prev => ({ ...prev, submitQuestion: true }));
      setError(null);
      
      try {
        const response = await api.post('/questions', {
          title: newQuestionTitle,
          body: newQuestionBody
        });
        
        // Add new question to the list
        const newQuestion = response.data.question || response.data;
        // Normalize ID
        const normalizedQuestion = {
          ...newQuestion,
          id: newQuestion.id || newQuestion._id
        };
        setQuestions(prev => [normalizedQuestion, ...prev]);
        setNewQuestionTitle('');
        setNewQuestionBody('');
        setShowNewQuestionForm(false);
      } catch (err) {
        console.error('Question submission error:', err);
        setError(err.response?.data?.error || 'Failed to submit question');
      } finally {
        setLoading(prev => ({ ...prev, submitQuestion: false }));
      }
    }
  };

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    if (newAnswer.trim() && selectedQuestion) {
      // Ensure selectedQuestion has a valid ID
      const questionId = selectedQuestion.id || selectedQuestion._id;
      if (!questionId) {
        setError('Invalid question ID. Please refresh the page and try again.');
        return;
      }
      
      setLoading(prev => ({ ...prev, submitAnswer: true }));
      setError(null);
      
      try {
        // Submit the answer
        const response = await api.post(`/questions/${questionId}/comment`, {
          body: newAnswer
        });
        console.log( response.data);
        
        // The response should contain the new answer
        const newAnswerData = response.data.comment || response.data;
        
        // Update selected question with new comment
        setSelectedQuestion(prev => ({
          ...prev,
          comments: [...(prev.comments || []), newAnswerData]
        }));
        
        // Update questions list with new comment
        setQuestions(prev => 
          prev.map(q => 
            (q.id || q._id) === questionId
              ? { 
                  ...q, 
                  comments: [...(q.comments || []), newAnswerData],
                  // Keep the existing answers array if it exists, or default to an empty array
                  answers: q.answers || []
                } 
              : q
          )
        );
        
        setNewAnswer('');
      } catch (err) {
        console.error('Answer submission error:', err);
        setError(err.response?.data?.error || 'Failed to submit answer');
      } finally {
        setLoading(prev => ({ ...prev, submitAnswer: false }));
      }
    }
  };

  const handleViewQuestion = async (question) => {
  const questionId = question.id || question._id;
  if (!questionId) {
    setError('Invalid question ID. Please refresh the page and try again.');
    return;
  }
  
  setLoading(prev => ({ ...prev, question: questionId }));
  setError(null);
  
  try {
    const response = await api.get(`/questions/${questionId}`);
    console.log('Fetched question response:', response); // <-- Console log added
    const fullQuestion = response.data.question || response.data;
    const normalizedFullQuestion = {
      ...fullQuestion,
      id: fullQuestion.id || fullQuestion._id
    };
    setSelectedQuestion(normalizedFullQuestion);
  } catch (err) {
    console.error('Question fetch error:', err);
    setError(err.response?.data?.error || 'Failed to load question');
  } finally {
    setLoading(prev => ({ ...prev, question: null }));
  }
};
  const handleBackToQuestions = () => {
    setSelectedQuestion(null);
  };

  // Truncate text function
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  if (loading.page && !currentUser) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-red-500">Error: {error}</div>;
  }

  if (!currentUser) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Redirecting...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          {/* Mobile: Welcome + Logout on top, Forum title below */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 whitespace-nowrap">
                Welcome, {currentUser.firstName}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 hover:text-red-800 whitespace-nowrap"
              >
                Logout
              </button>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Community Forum</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {selectedQuestion ? (
          // Question Detail View
          <div className="bg-white shadow rounded-lg p-4 sm:p-6">
            <button
              onClick={handleBackToQuestions}
              className="mb-4 text-red-600 hover:text-red-800 flex items-center"
            >
              ← Back to all questions
            </button>
            
            <div className="border-b pb-4 mb-6">
              <h2 className="text-xl font-bold text-gray-900">{selectedQuestion.title}</h2>
              {selectedQuestion.body && (
                <p className="mt-3 text-gray-700">{selectedQuestion.body}</p>
              )}
              <div className="mt-4 text-sm text-gray-500">
                Asked by {selectedQuestion.author?.firstName} {selectedQuestion.author?.lastName} • {selectedQuestion.timestamp}
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b pb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {selectedQuestion.comments?.length || 0} {selectedQuestion.comments?.length === 1 ? 'Comment' : 'Comments'}
                </h3>
              </div>
              
              {selectedQuestion.comments?.length > 0 ? (
                <div className="space-y-4 sm:space-y-6">
                  {selectedQuestion.comments.map((comment) => (
                    <div key={comment.id || comment._id} className="bg-gradient-to-br from-red-50 to-white rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-4">
                          <div className="h-10 w-10 rounded-full bg-gradient-red flex items-center justify-center text-white font-semibold">
                            {comment.author?.firstName?.charAt(0)}{comment.author?.lastName?.charAt(0)}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center flex-wrap gap-2">
                            <h4 className="text-sm font-medium text-red-600">
                              {comment.author?.firstName} {comment.author?.lastName}
                            </h4>
                            <span className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</span>
                          </div>
                          <p className="mt-2 text-gray-700 leading-relaxed">
                            {comment.body}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gradient-to-br from-red-50 to-white rounded-lg border border-red-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <h4 className="mt-3 text-lg font-medium text-gray-900">No comments yet</h4>
                  <p className="mt-1 text-gray-500 max-w-md mx-auto">Be the first to comment! Your insights could help others in the community.</p>
                </div>
              )}
              
              {/* Answer Form */}
              <div className="mt-8 sm:mt-10 pt-6 border-t">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="h-10 w-10 rounded-full bg-gradient-red flex items-center justify-center text-white font-semibold mr-3 flex-shrink-0">
                    {currentUser?.firstName?.charAt(0)}{currentUser?.lastName?.charAt(0)}
                  </div>
                  <h4 className="text-lg font-medium text-gray-900">Write your answer</h4>
                </div>
                
                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
                
                <form onSubmit={handleSubmitAnswer} className="space-y-4">
                  <div className="relative">
                    <textarea
                      value={newAnswer}
                      onChange={(e) => setNewAnswer(e.target.value)}
                      placeholder="Share your knowledge and experience..."
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 resize-none"
                      required
                    />
                    <div className="absolute bottom-3 right-3 flex items-center space-x-2">
                      <span className={`text-xs ${newAnswer.length > 1000 ? 'text-red-500' : 'text-gray-400'}`}>
                        {newAnswer.length}/1000
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => setNewAnswer('')}
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors mr-3"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading.submitAnswer || !newAnswer.trim()}
                      className={`px-6 py-2 text-sm font-medium text-white rounded-md transition-colors ${
                        newAnswer.trim() 
                          ? 'bg-gradient-red hover:opacity-90' 
                          : 'bg-gray-300 cursor-not-allowed'
                      }`}
                    >
                      {loading.submitAnswer ? 'Posting...' : 'Post Answer'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          // Questions List View
          <>
            {/* Fixed "Ask a Question" Button */}
            <div className="fixed bottom-8 right-8 z-10">
              <button
                onClick={() => setShowNewQuestionForm(!showNewQuestionForm)}
                disabled={loading.submitQuestion}
                className="bg-gradient-red hover:opacity-90 text-white font-medium py-3 px-6 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center disabled:opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Ask a Question
              </button>
            </div>

            <div className="pt-6">
              {showNewQuestionForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20 p-4">
                  <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-gray-900">Ask your question</h3>
                        <button 
                          onClick={() => setShowNewQuestionForm(false)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      
                      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
                      
                      <form onSubmit={handleSubmitQuestion}>
                        <div className="mb-4">
                          <label htmlFor="questionTitle" className="block text-sm font-medium text-gray-700 mb-1">
                            Question Title
                          </label>
                          <input
                            type="text"
                            id="questionTitle"
                            value={newQuestionTitle}
                            onChange={(e) => setNewQuestionTitle(e.target.value)}
                            placeholder="Enter a clear, concise title for your question"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="questionBody" className="block text-sm font-medium text-gray-700 mb-1">
                            Question Details (Optional)
                          </label>
                          <textarea
                            id="questionBody"
                            value={newQuestionBody}
                            onChange={(e) => setNewQuestionBody(e.target.value)}
                            placeholder="Provide more details about your question..."
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                          />
                        </div>
                        <div className="mt-4 flex justify-end space-x-3">
                          <button
                            type="button"
                            onClick={() => setShowNewQuestionForm(false)}
                            className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={loading.submitQuestion}
                            className="px-4 py-2 bg-gradient-red text-white text-sm font-medium rounded-md hover:opacity-90 disabled:opacity-50"
                          >
                            {loading.submitQuestion ? 'Posting...' : 'Post Question'}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-6 pt-4">
              <h2 className="text-xl font-bold text-gray-900">Recent Questions</h2>
              
              {questions.map((question) => (
                <div key={question.id || question._id} className="bg-white shadow rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow">
                  <h3 
                    onClick={() => handleViewQuestion(question)}
                    className="text-lg font-medium text-gray-900 cursor-pointer hover:text-red-600 transition-colors"
                  >
                    {truncateText(question.title, 100)}
                  </h3>
                  {question.body && (
                    <p className="mt-2 text-gray-600">
                      {truncateText(question.body, 150)}
                    </p>
                  )}
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                    <div className="text-sm text-gray-500">
                      Asked by {question.author?.firstName} {question.author?.lastName} • {question.timestamp}
                    </div>
                    <button
                      onClick={() => handleViewQuestion(question)}
                      disabled={loading.question === (question.id || question._id)}
                      className="text-red-600 hover:text-red-800 font-medium whitespace-nowrap disabled:opacity-50"
                    >
                      {loading.question === (question.id || question._id)
                        ? 'Loading...'
                        : `See ${question.comments?.length || 0} comment${question.comments?.length !== 1 ? 's' : ''}`}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}